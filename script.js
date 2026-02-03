(function carregarTema() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'claro') {
        document.body.classList.add('light-mode');
        // Ajusta o texto do botão se ele já existir no DOM
        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById('theme-toggle').innerText = "Modo Escuro";
        });
    }
})();

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const btn = document.getElementById('theme-toggle');
    
    if (document.body.classList.contains('light-mode')) {
        btn.innerText = "Modo Escuro";
        localStorage.setItem('tema', 'claro'); // Salva a preferência
    } else {
        btn.innerText = "Modo Claro";
        localStorage.setItem('tema', 'escuro'); // Salva a preferência
    }
}

const unidades = {
    tempo: {
        ms: { fator: 0.001, nome: "Milissegundos" },
        s: { fator: 1, nome: "Segundos" },
        m: { fator: 60, nome: "Minutos" },
        h: { fator: 3600, nome: "Horas" },
        d: { fator: 86400, nome: "Dias" },
        sem: { fator: 604800, nome: "Semanas" },
        mes: { fator: 2592000, nome: "Meses" },
        ano: { fator: 31536000, nome: "Anos" }
    },
    dados: {
        b: { fator: 1, nome: "Bytes" },
        kb: { fator: 1024, nome: "Kilobytes" },
        mb: { fator: 1024**2, nome: "Megabytes" },
        gb: { fator: 1024**3, nome: "Gigabytes" },
        tb: { fator: 1024**4, nome: "Terabytes" },
        pb: { fator: 1024**5, nome: "Petabytes" },
        eb: { fator: 1024**6, nome: "Exabytes" }
    }
};

function atualizarOpcoes() {
    const de = document.getElementById('uDe').value;
    const paraSelect = document.getElementById('uPara');
    paraSelect.innerHTML = ''; 

    if (!de) {
        paraSelect.innerHTML = '<option value="">Selecione a origem...</option>';
        document.getElementById('resultado').style.display = 'none';
        return;
    }

    const categoria = unidades.tempo[de] ? 'tempo' : 'dados';
    const listaUnidades = unidades[categoria];

    for (let sigla in listaUnidades) {
        if (sigla !== de) {
            let option = document.createElement('option');
            option.value = sigla;
            option.text = listaUnidades[sigla].nome;
            paraSelect.appendChild(option);
        }
    }
    calcular();
}

function calcular() {
    const valor = parseFloat(document.getElementById('valorInput').value);
    const de = document.getElementById('uDe').value;
    const para = document.getElementById('uPara').value;
    const display = document.getElementById('resultado');

    if (isNaN(valor) || !de || !para) {
        display.style.display = 'none';
        return;
    }

    const categoria = unidades.tempo[de] ? 'tempo' : 'dados';
    const valorEmBase = valor * unidades[categoria][de].fator;
    const resultadoFinal = valorEmBase / unidades[categoria][para].fator;

    let resultadoFormatado;
    if (resultadoFinal === 0) {
        resultadoFormatado = "0";
    } else {
        resultadoFormatado = resultadoFinal.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    }

    display.innerText = `${resultadoFormatado} ${unidades[categoria][para].nome}`;
    display.style.display = 'block';
}