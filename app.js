const inputCEP = document.getElementById("inputCEP");

inputCEP.addEventListener("input", (event) => {
    // Esse \D retira tudo o que nao e numero
    inputCEP.value = inputCEP.value.replace(/\D/g, "");

    // Se a quantidade de caracter do input for maior que 8 entao ele trunca
    // Nao permitindo inserir mais numero (o slice faz isso)
    if (inputCEP.value.length > 8) {
        inputCEP.value = inputCEP.value.slice(0, 8);
    }
});

const limparDados = () => {
    document.getElementById("box-result").style.animation = "fadeInUp .3s forwards";
    document.getElementById("inputCEP").value = "";
    document.getElementById("close-result").style.animation = " scaleDown .3s forwards";
};

const limparDadosInvalidos = () => {
    document.getElementById("box-result-invalid").style.animation = "fadeInUp .3s forwards";
    document.getElementById("inputCEP").value = "";
    document.getElementById("close-result-invalid").style.animation = " scaleDown .3s forwards";
};
const limparDadosNull = () => {
    document.getElementById("box-result-null").style.animation = "fadeInUp .3s forwards";
    document.getElementById("inputCEP").value = "";
    document.getElementById("close-result-null").style.animation = " scaleDown .3s forwards";
};

const pesquisarCEP = async () => {
    const cep = document.getElementById("inputCEP").value.trim();

    if (!/^\d{8}$/.test(cep)) {
        document.getElementById("box-result-invalid").style.animation = "fadeInDown .3s forwards";
        document.getElementById("close-result-invalid").style.animation = " scaleIn .3s forwards";
        document.getElementById("box-result-invalid").style.display = "flex";
        document.getElementById("cep-invalid").value = "CEP -" + cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");



        setTimeout(() => {
            document.getElementById("box-result-invalid").style.animation = "fadeInUp .3s forwards";
            document.getElementById("close-result-invalid").style.animation = " scaleDown .3s forwards";
        }, 5000);
        document.getElementById("inputCEP").value = "";
        return;
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao consultar o CEP.");
        const data = await response.json();

        // Mensagem de Erro CEP invalido.

        if (data.erro) {
            document.getElementById("box-result-null").style.animation = "fadeInDown .3s forwards";
            document.getElementById("close-result-null").style.animation = " scaleIn .3s forwards";
            document.getElementById("box-result-null").style.display = "flex";

            document.getElementById("cep-null").value = "CEP -" + cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
            // Aqui da um tempo de 5 segundos e recolhe o box de CEP inexistente
            setTimeout(() => {
                document.getElementById("box-result-null").style.animation = "fadeInUp .3s forwards";
                document.getElementById("close-result-null").style.animation = " scaleDown .3s forwards";
            }, 5000);
            document.getElementById("inputCEP").value = "";
            return;
        }

        // Aqui vai as informações da resposa da API
        document.getElementById("cep").value = `CEP - ${data.cep}` || "";
        document.getElementById("rua").value = `Logradouro: ${data.logradouro}` || "";
        document.getElementById("bairro").value = `Bairro: ${data.bairro}` || "";
        document.getElementById("cidade").value = `Cidade: ${data.localidade}` || "";
        document.getElementById("estado").value = `Estado: ${data.uf}` || "";
        document.getElementById("regiao").value = `Região: ${data.regiao}` || "";
        document.getElementById("ibge").value = `IBGE: ${data.ibge}` || "";
        document.getElementById("ddd").value = `DDD: ${data.ddd}` || "";
        document.getElementById("box-result").style.animation = "fadeInDown .3s forwards";
        document.getElementById("box-result").style.display = "flex";
        document.getElementById("close-result").style.animation = " scaleIn .3s forwards";

    } catch (error) {
        console.error("Erro na consulta:", error.message);
        alert("Erro ao consultar o CEP. Tente novamente mais tarde.");
        document.getElementById("inputCEP").value = "";

    }
}

// Evento para quando eu apertar o enter ele fazer a mesma funcao de click no botao de pesquisarCEP
document.getElementById("inputCEP").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.getElementById("pesquisarCEP").click()
    }
})