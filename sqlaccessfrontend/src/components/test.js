var result=fetch("http://localhost:5000/api/getDatabases",{method: 'POST', body: JSON.stringify({server:serverName})})
console.log(result)