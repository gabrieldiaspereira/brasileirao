<p align="center">
<img src="https://i.imgur.com/wEgrF4w.png" width="350" height="350"/>
</p>
<h1 align="center">⚽ Brasileirão A e B ⚽</h1>
<p align="center">
<a href="https://github.com/gabrieldiaspereira/brasileirao/stargazers/"><img title="Estrelas" src="https://img.shields.io/github/stars/gabrieldiaspereira/brasileirao?label=estrelas&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira/brasileirao/watchers"><img title="Acompanhando" src="https://img.shields.io/github/watchers/gabrieldiaspereira/brasileirao?label=acompanhando&style=flat&color=#79C83D"></a>
<a href="https://github.com/gabrieldiaspereira"><img title="Autor" src="https://img.shields.io/badge/autor-gabrieldiaspereira-blue.svg?logo=github&color=#79C83D"></a>
</p>
<h3 align="center"> 🔎 Consulta de dados de tabela e de todas as rodadas.</h3>

[Read in English](README_EN.md)

## Instalação :
npm :
```bash
npm i --save @gabrieldiaspereira/brasileirao
```

yarn :
```bash
yarn add @gabrieldiaspereira/brasileirao
```

## Exemplo de Uso
```js
import {obterDadosBrasileiraoA, obterDadosBrasileiraoB} from '@gabrieldiaspereira/brasileirao'

const brasileiraoA = await obterDadosBrasileiraoA() //Se não quiser os dados de rodadas dê false como parâmetro.
const brasileiraoB = await obterDadosBrasileiraoB() //Se não quiser os dados de rodadas dê false como parâmetro.

```

## Exemplo de Resposta
Em uma resposta bem-sucedida com as rodadas :
```js
{
    tabela: [
        {
            nome: 'Flamengo',
            escudo: 'https://p2.trrsf.com/image/fget/cf/51/51/s1.trrsf.com/musa/pro/6juc9voua610blou9p2ih6r6pj.png',
            posicao: '1',
            pontos: '14',
            jogos: '7',
            vitorias: '4',
            empates: '2',
            derrotas: '1',
            gols_pro: '13',
            gols_contra: '6',
            saldo_gols: '7',
            aproveitamento: '66%'
        },
        ...
    ],
    rodadas: [
        { 
            rodada: '1ª rodada',
            inicio: '13/04/2024',
            rodada_atual: false,
            partidas: [
                {
                    partida: 'Criciúma x Juventude',
                    data: 'Sáb 13/04 18h30',
                    local: 'Heriberto Hülse',
                    time_casa: 'Criciúma',
                    time_fora: 'Juventude',
                    gols_casa: '1',
                    gols_fora: '1',
                    resultado_texto: 'Criciúma 1 x 1 Juventude'
                },
                ...
            ]
        },
        ...
    ]
}

```

Em caso de erro, será rejeitado o objeto com a mensagem de erro :
```js
{
    erro: "Mensagem de erro"
}
```
