import express from 'express';

import Users from '../models/user.js'
const transactions = express.Router(); 
transactions.post('/new-transactions', async (req, res) => {  // Corrigir o nome da rota

    const {data} = req.body

    if(!data) return 

    const {User,
        Amount,
        Description,
        Category,
        transactionId,
        TypeTransction} = data


        console.log(`transction id ${transactionId}`)
    
   if(!User || !Category || !TypeTransction || !Amount || !Description ) {
    return res.status(400).json({message: 'todos campos necessarios'})
   }

    try  {
        const user = await Users.findOne({id: User})

        if(user) {
            const newTransction = {
                Amount,
                transactionId,
                Description,
                Category,
                TypeTransactions: TypeTransction
            }
            user.transactions.push(newTransction)

            await user.save()

            console.log('usuario existente')

            return res.status(200).json({ message: 'Transaction created successfully' });
            
        }

        const newUser = new Users({
            id: User,
            
            transactions: [{
                transactionId,
                Amount,
                Description,
                Category,
                TypeTransactions: TypeTransction
            }]
        })
        console.log('usuario novo')

        await newUser.save()
    } catch (error){
        console.log(error)

        return res.status(500).json({ message: 'Server Error' });
    }
    

});

transactions.post('/get-user-transaction', async (req, res) => {
    const { UserId, page = 1, Filter } = req.body; // 'page' agora é extraído da requisição, com valor padrão 


   


    if (!UserId) return res.status(400).json({message: 'user not found'})

    try {
        const user = await Users.findOne({ id: UserId });

        
        if (user) {

                const sortedTransactions  = user.transactions.sort((a,b) => {
                    return new Date(b.CreateAt) - new Date(a.CreateAt)
                })

            const transactionsPerPage = 3;
            
            const skip = (page - 1) * transactionsPerPage;

            const paginatedTransactions = sortedTransactions.slice(skip, skip + transactionsPerPage);


            if(Filter) {
                
                const filteredTransactions = sortedTransactions.filter(transaction => 
                    transaction.Description.toLowerCase().includes(Filter.toLowerCase())
                )

                user.transactions = filteredTransactions
                return res.status(200).json(filteredTransactions);
            }


            user.transactions = paginatedTransactions
            return res.status(200).json(user.transactions);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

transactions.post('/get-user-data', async (req, res) => {
    const { UserId } = req.body; // 'page' agora é extraído da requisição, com valor padrão de 1

    if (!UserId) return res.status(400).json({message: 'todos campos necessarios'})

    try {
        const user = await Users.findOne({ id: UserId });

        if (user) {


            return res.status(200).json(user);
        } else {        
                const newUser = new Users({
                    id: UserId,
                    transactions: []
                })
                
                await newUser.save()
    
                return res.status(200).json(user)
            
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

transactions.delete('/delete-transcations', async (req, res) => {
    const {UserId, transactionId} = req.body

    
    console.log(UserId)
    
    if (!UserId || !transactionId) return res.status(400).json({ message: 'UserId and transactionId are required' });


    try {
        const user = await Users.findOne({ id: UserId });

        if(!user) return res.status(404).json({ message: 'user not found' });

        const updatedTransactions = user.transactions.filter(transaction => transaction.transactionId.toString() !== transactionId);

        user.transactions = updatedTransactions

        await user.save()

        console.log('sucess deleted transaction')

        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch {
        console.log('error deleted transaction')

        return res.status(500).json({ message: 'Server Error' });
    }
} )

transactions.put('/edit-transctions', async (req, res) => {
    const {UserId,
        transactionId,
         Amount,
         Category,
         Description,
         TypeTransction,} = req.body

   
    if(!UserId
        || !transactionId 
        || !Amount
        || !Category
        || !Description
        || !TypeTransction
    ) return res.status(400).json({message: 'Todos campos necessarios'})
     

    try {
        const user = await Users.findOne({id: UserId})

        if(!user) return res.status(404).json({ message: 'user not found' });

        const updatedTransactions =  {
            Amount,
            transactionId,
            Category,
            Description,
            TypeTransactions: TypeTransction
        }
         user.transactions = user.transactions.map((transcations) => 
         transcations.transactionId === transactionId ? updatedTransactions : transcations)

        await user.save()
        


        return res.status(200).json({ message: 'Transaction edited successfully' });

    } catch {
        console.log('error edited transaction')
        return res.status(500).json({ message: 'Server Error' });
    }



})
export default transactions;
