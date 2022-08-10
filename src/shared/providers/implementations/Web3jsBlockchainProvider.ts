import { ConfirmTransactionDTO, IBlockchainProvider } from '../IBlockchainProvider';
import Web3 from 'web3';
import { AppError } from '../../errors/AppError';
import { IHashProvider } from '../IHashProvider';
import { ITransactionsRepository } from '../../../modules/logs/repositories/ITransactionsRepositories';
import { ethToWei } from '../../helpers/ethToWei';

export class Web3jsBlockchainProvider implements IBlockchainProvider {
    private web3: Web3

    constructor(
        private hashProvider: IHashProvider,
        private transactionsRepository: ITransactionsRepository
    ) {
        this.web3 = new Web3(
            new Web3.providers.HttpProvider(
                process.env.BLOCKCHAIN_PROVIDER_URL || 'http://localhost:8545'
            )
        );
    }

    async confirmTransaction({ tx_hash, amount, from }: ConfirmTransactionDTO): Promise<boolean> {
        if(process.env.NODE_ENV !== 'production') { 
            return true;
        }
        
        const checkIfTheTransactionHasAlreadyBeenCarriedOut = await this.transactionsRepository.findByTxHash(tx_hash);

        if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
            throw new AppError('This transaction has already been carried out', 400);
        }
        try {
            const transaction = await this.web3.eth.getTransaction(tx_hash)
    
            if(!ethToWei(amount).equals(transaction.value)) {
                throw new AppError('The transaction value is not the same as the one sent', 400);
            }
    
            const currentBlock = await this.web3.eth.getBlockNumber()
    
            if(transaction.to !== process.env.WALLET_TO) {
                throw new AppError('The transaction destination is not the same as the wallet address', 400)
            }
            
            const walletMatched = await this.hashProvider.compareHash(transaction.from, from)
    
            if(!walletMatched) {
                throw new AppError('The transaction origin is not the same as the user wallet', 400)
            }
    
            if(!transaction.blockNumber) {
                throw new AppError('The transaction does not have a block number', 400)
            }
    
            if(currentBlock - transaction.blockNumber < 10) {
                throw new AppError('The transaction is not mined yet', 400)
            }
        
            await this.transactionsRepository.create({
                wallet: from,
                tx_hash,
            })
            
            return true
        } catch {
            throw new AppError('The transaction could not be confirmed', 400)
        }
    }

}