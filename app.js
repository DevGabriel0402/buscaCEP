window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("box-result").style.display = "flex";
        document.getElementById("box-result").style.opacity = "0";
    }, 500)
})


const limparDados = () => {
    document.getElementById("box-result").style.animation = "fadeInUp .3s forwards";
    document.getElementById("inputCEP").value = "";
    document.getElementById("close-result").style.animation = " scaleDown .3s forwards";


};
document.getElementById("pesquisarCEP").onclick = async () => {
    const cep = document.getElementById("inputCEP").value.trim();

    if (!/^\d{8}$/.test(cep)) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        limparDados()
        return;
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao consultar o CEP.");
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado.");
            limparDados();
            return;
        }
        document.getElementById("cep").value = `CEP - ${data.cep}` || "";
        document.getElementById("rua").value = `Logradouro: ${data.logradouro}` || "";
        document.getElementById("bairro").value = `Bairro: ${data.bairro}` || "";
        document.getElementById("cidade").value = `Cidade: ${data.localidade}` || "";
        document.getElementById("estado").value = `Estado: ${data.uf}` || "";
        document.getElementById("box-result").style.animation = "fadeInDown .3s forwards";
        document.getElementById("close-result").style.animation = " scaleIn .3s forwards";


    } catch (error) {
        console.error("Erro na consulta:", error.message);
        alert("Erro ao consultar o CEP. Tente novamente mais tarde.");
        limparDados();
    }
};