const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			slug: "mimoun",
			contacts: [],
			currentContact: {},
			baseURLContacts:"https://playground.4geeks.com/contact/agendas"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setCurrentContact: (contact) => { setStore({ currentContact: contact}) },
			getContacts: async () => {
				const uri = `${getStore().baseURLContacts}/${getStore().slug}`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if(response.status === 404){
					getActions().createUser()
				}
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore({contacts: data.contacts});
			},

			deleteContact: async (contactId) => {		
				const uri = `${getStore().baseURLContacts}/${getStore().slug}/contacts/${contactId}`;
				const options = {
					method: "DELETE"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText);
					return
				}
				getActions().getContacts();
			},

			addContact: async (dataToSend) => {
				const uri =`${getStore().baseURLContacts}/${getStore().slug}/contacts`
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error:', response.status, response.statusText)
					return  
				}
				getActions().getContacts()
			},
			exampleFunction: () => {getActions().changeColor(0, "green");},
			getMessage: async () => {
				const response = await fetch(process.env.BACKEND_URL + "api/hello")
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				setStore({ message: data.message })
				// don't forget to return something, that is how the async resolves
				return data;
			},
			editContact: async (id, contact) =>{
				const uri= `${getStore().baseURLContacts}/${getStore().slug}/contacts/${id}`
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// Tratar el error
					return;
				}
				getActions().getContacts()
			}
		}
	};
};

export default getState;
