// Condições do tempo conforme os códigos WMO usados pelo Open-Meteo.
function descricaoTempo(codigo) {
    if (codigo === 0) return 'Céu limpo';
    if (codigo === 1) return 'Predominantemente limpo';
    if (codigo === 2) return 'Parcialmente nublado';
    if (codigo === 3) return 'Nublado';
    if ([45, 48].includes(codigo)) return 'Nevoeiro';
    if ([51, 53, 55, 56, 57].includes(codigo)) return 'Garoa';
    if ([61, 63, 65, 66, 67].includes(codigo)) return 'Chuva';
    if ([71, 73, 75, 77, 85, 86].includes(codigo)) return 'Neve';
    if ([80, 81, 82].includes(codigo)) return 'Pancadas de chuva';
    if ([95, 96, 99].includes(codigo)) return 'Trovoadas';
    return 'Condição indisponível';
}

async function carregarPrevisao(lista) {
    const parametros = new URLSearchParams({
        latitude: lista.dataset.latitude,
        longitude: lista.dataset.longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'America/Sao_Paulo',
        forecast_days: '3'
    });

    try {
        const resposta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros}`, {
            signal: AbortSignal.timeout(15000)
        });
        if (!resposta.ok) throw new Error('Previsão indisponível');

        const dados = await resposta.json();
        const previsao = dados.daily;
        if (!previsao || previsao.time?.length !== 3) throw new Error('Previsão incompleta');

        const itens = previsao.time.map((data, indice) => {
            const minima = previsao.temperature_2m_min?.[indice];
            const maxima = previsao.temperature_2m_max?.[indice];
            const codigo = previsao.weather_code?.[indice];
            const dia = new Date(`${data}T12:00:00-03:00`);
            if (!Number.isFinite(minima) || !Number.isFinite(maxima) ||
                !Number.isFinite(codigo) || Number.isNaN(dia.getTime())) {
                throw new Error('Previsão incompleta');
            }

            const item = document.createElement('li');
            item.className = 'list-group-item px-0 py-3';
            const titulo = document.createElement('strong');
            titulo.className = 'd-block';
            titulo.textContent = dia.toLocaleDateString('pt-BR', {
                weekday: 'short', day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo'
            });
            const condicao = document.createElement('span');
            condicao.className = 'd-block text-body-secondary my-1';
            condicao.textContent = descricaoTempo(codigo);
            const temperaturas = document.createElement('span');
            temperaturas.textContent = `Mín. ${Math.round(minima)} °C · Máx. ${Math.round(maxima)} °C`;
            item.append(titulo, condicao, temperaturas);
            return item;
        });
        lista.replaceChildren(...itens);
    } catch {
        const aviso = document.createElement('li');
        aviso.className = 'list-group-item text-body-secondary';
        aviso.textContent = 'Não foi possível carregar a previsão. Tente atualizar a página.';
        lista.replaceChildren(aviso);
    } finally {
        lista.setAttribute('aria-busy', 'false');
    }
}

document.querySelectorAll('[data-previsao]').forEach(carregarPrevisao);

const formularioCadastro = document.querySelector('#formulario-cadastro');
if (formularioCadastro) {
    const retorno = document.querySelector('#cadastro-retorno');
    formularioCadastro.querySelector('[type="submit"]').disabled = false;
    formularioCadastro.addEventListener('submit', (evento) => {
        evento.preventDefault();
        retorno.classList.remove('d-none');
    });
    formularioCadastro.addEventListener('input', () => retorno.classList.add('d-none'));
}
