<script>
	import axios from "axios";
	import { onMount } from "svelte";
	
	import Loading from "./components/Loading.svelte";


	let cantidad = 0;
	let typeOfTransaction = "+";
	let transactions = [];
	let loading = false; //to show a progress bar

	$: sorterTransactions = transactions.sort((a, b) => b.date - a.date); //ordenar las transacciones
	$: disabled = !cantidad;  
	$: balance = transactions.reduce((acc, t) => acc + t.value, 0); //mostrar el total de ingresos
	$: income = transactions.filter(t => t.value > 0).reduce((acc, t) => acc + t.value, 0) //mostrar ingresos positivos
	$: expenses = transactions.filter(t => t.value < 0).reduce((acc, t) => acc + t.value, 0) //mostrar ingresos negativos

	onMount( async () =>{
		loading = true;
		const { data } = await axios.get("/api/transactions");
		transactions = data;
		loading = false;
	});

	async function addTransaction() {
		const transaction = {
			date: new Date().getTime(),
			value: typeOfTransaction === '+' ? cantidad : cantidad * -1
		};
		const response = await axios.post('/api/transactions', transaction);
		transactions = [response.data, ...transactions];
		cantidad = 0;
	}

	async function removeTransaction(id) {
		const response = await axios.delete('/api/transactions/' + id);
		if(response.data.id === id){
			transactions = transactions.filter(t => t._id !== id);
		}
	}

</script>





<div class="container p-4">

	<div class="col-md-4 offset-md-4">

		<form class="card card-body">
	
			<div class="form-group">
					
				<select class="p-3" bind:value={typeOfTransaction}>
					<option value="+">+</option>
					<option value="-">-</option>
				</select>
				
				<input type="number" bind:value={cantidad} placeholder="Amount of money" class="p-3">	
				
				<button class="btn btn-primary p-3" on:click|preventDefault={addTransaction} {disabled}>Save</button>

			</div>

			

			<!---
				<div class="form-group">
					<p>{input}</p>
					<p>{typeOfTransaction}</p>
					{JSON.stringify(transactions)}
				</div>
				
			-->
			{#if loading}
				<Loading/>
			{/if}

			{#if transactions.length > 0}
			<div class="form-group">
				<h3 class=" alert alert-info text-center">The balance is : {balance}</h3>
			</div>
			
			<div class="form-group">
				<div class="row">
					<div class="col	 alert alert-success text-center p-2" >
						<h5> Income: {income}</h5>
					</div>
					<div class="col alert alert-warning text-center p-2">
						<h5>Expenses: {expenses}</h5>
					</div>
				</div>
			</div>
			<hr>
			{:else if !loading}

			<div class="alert alert-info text-center">
				Add your first transaction!!
			</div>

			{/if}

			
			

		</form>

		<hr>

		{#each sorterTransactions as transaction (transaction._id)}
		<div class="card card-body mt-2">
			<h5 class="text-center"> Transaction: {transaction.value}</h5>
			<h5 class="text-center">Date: {new Date(transaction.date).toLocaleDateString()}</h5>
			<button class="btn btn-danger p-1" on:click={() => removeTransaction(transaction._id)}>Delete</button>
		</div>
		
		{/each}

	</div>

	

	

</div>










