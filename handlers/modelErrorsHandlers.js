


const handlerUserErrors = (err)=>{
    console.log("Error: ", err, "Code: ", err.code);

    const errors = {username: "", passwd: "", authorization:""}

    if(err.message == "Nøkkelen er ikke aktiv.."){
        errors.authorization = "Nøkkelen er ikke aktiv..";
        return errors;
    }
    if(err.code === 11000){
        errors.username = "Brukernavnet er allerede i bruk..";
        return errors;
    }

    if(err.message == "Passordet er ikke likt som det gjentatte passordet.."){
        errors.passwd = "Passordet er ikke likt som det gjentatte passordet..";
        return errors;
    }

    if(err.message == "Feil Passord.."){
        errors.passwd = "Oppgitt passord er feil..";
        return errors;
    }

    if(err.message == "Oppgitt bruker eksisterer ikke.."){
        errors.username = "Oppgitt bruker eksisterer ikke..";
        return errors;
    }

    Object.values(err.errors).forEach(({properties}) =>{
     errors[properties.path] = properties.message;
    })
    return errors;
}


const handleIssueErrors = (err)=>{
    console.log("ERROR MESSAGE: ",err.message, "ERROR CODE: ",err.code);

    const errors = {title:"", description:""};

    if(err.code == 11000){
        errors.title = "Tittelen er allerede i bruk og hendelsen er registrert.."
        return errors;
    }

    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path] = properties.message;
    })

    return errors;
}


module.exports = {
    handlerUserErrors,
    handleIssueErrors
};