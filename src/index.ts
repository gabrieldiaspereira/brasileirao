import axios from 'axios'
import {JSDOM} from 'jsdom'
import UserAgent from 'user-agents'

const URL_TABELA_A = "https://p1.trrsf.com/api/musa-soccer/ms-standings-light?idChampionship=1456&idPhase=&language=pt-BR&country=BR&nav=N&timezone=BR"
const URL_RODADAS_A = "https://p1.trrsf.com/api/musa-soccer/ms-standings-games-light?idChampionship=1456&idPhase=&language=pt-BR&country=BR&nav=N&timezone=BR"
const URL_TABELA_B = "https://p1.trrsf.com/api/musa-soccer/ms-standings-light?idChampionship=1438&idPhase=&language=pt-BR&country=BR&nav=N&timezone=BR"
const URL_RODADAS_B = "https://p1.trrsf.com/api/musa-soccer/ms-standings-games-light?idChampionship=1438&idPhase=&language=pt-BR&country=BR&nav=N&timezone=BR"

export interface TeamTable {
    nome: string,
    escudo: string,
    posicao: string,
    pontos: string,
    jogos: string,
    vitorias: string,
    empates: string,
    derrotas: string,
    gols_pro: string,
    gols_contra: string,
    saldo_gols: string,
    aproveitamento: string
}

export interface Round {
    rodada: string,
    inicio: string,
    rodada_atual: boolean,
    partidas : Match[]
}

export interface Match {
    partida : string,
    data: string,
    local: string,
    time_casa : string,
    time_fora : string,
    gols_casa : string,
    gols_fora : string,
    resultado_texto: string,
}

export interface LeagueData {
    tabela : TeamTable[],
    rodadas? : Round[]
}

export async function getLeagueAData(rounds = true){
    try {
        const tableTeams = await getTableData(URL_TABELA_A)
        let result : LeagueData = {tabela: tableTeams}
        if(rounds) result.rodadas = await getRoundsData(URL_RODADAS_A)
        return result
    } catch(err){
        throw err
    }
}

export async function getLeagueBData(rounds = true){
    try {
        const tableTeams = await getTableData(URL_TABELA_B)
        let result : LeagueData = {tabela: tableTeams}
        if(rounds) result.rodadas = await getRoundsData(URL_RODADAS_B)
        return result
    } catch(err){
        throw err
    }
}

async function getPage(url: string){
    try{
        const userAgent = new UserAgent()
        const {data} = await axios.get(url, {headers: {'User-Agent': userAgent.toString()}})
        const { window } = new JSDOM(data)
        return window
    } catch(err){
        throw err
    }
}

async function getTableData(url : string){
    try{
        const { document } = await getPage(url)
        const teams : TeamTable[] = []
        const $teams = document.querySelectorAll("table > tbody > tr")

        $teams.forEach($team => {
            teams.push({
                nome: $team.querySelector('.team-name > a')?.getAttribute("title") || '',
                escudo: $team.querySelector('.shield > a > img')?.getAttribute("src") || '',
                posicao: $team.querySelector('.position')?.innerHTML || '',
                pontos: $team.querySelector('.points')?.innerHTML || '',
                jogos: $team.querySelector('td[title="Jogos"]')?.innerHTML || '',
                vitorias: $team.querySelector('td[title="Vitórias"]')?.innerHTML || '',
                empates: $team.querySelector('td[title="Empates"]')?.innerHTML || '',
                derrotas: $team.querySelector('td[title="Derrotas"]')?.innerHTML || '',
                gols_pro: $team.querySelector('td[title="Gols Pró"]')?.innerHTML || '',
                gols_contra: $team.querySelector('td[title="Gols Contra"]')?.innerHTML || '',
                saldo_gols: $team.querySelector('td[title="Saldo de Gols"]')?.innerHTML || '',
                aproveitamento: $team.querySelector('td[title="Aproveitamento"]')?.innerHTML+"%",
            })
        })

        return teams
    } catch(err){
        throw err
    }
}

async function getRoundsData(url: string){
    try{
        const { document } = await getPage(url)
        let rounds : Round[] = []
        const $rounds = document.querySelectorAll("ul.rounds > li")

        $rounds.forEach($round => {
            const roundDateData = $round.querySelector("br.date-round")?.getAttribute("data-date")
            if(!roundDateData) throw new Error("Error getting round information")
            const [date] = roundDateData.split(" ") 
            const [year, month, day] = date.split("-")

            let roundData : Round = {
                rodada: $round.querySelector("h3")?.innerHTML || '',
                inicio: `${day}/${month}/${year}`,
                rodada_atual: $round.getAttribute("class") === "round",
                partidas : []
            }

            const $matches =  $round.querySelectorAll("li.match")
            $matches.forEach($match =>{
                const teams = $match.querySelector('meta[itemprop="name"]')?.getAttribute("content")
                if(!teams) throw new Error("Error getting round information")
                const [home_team, away_team] = teams.split("x").map(team => team.trim())
                const home_goals = $match.querySelector('.goals.home')?.innerHTML || ''
                const away_goals = $match.querySelector('.goals.away')?.innerHTML || ''

                roundData.partidas.push({
                    partida: teams,
                    data: $match.querySelector('div.details > strong.date-manager')?.innerHTML || '',
                    local: $match.querySelector('div.details > span.stadium')?.innerHTML || '',
                    time_casa: home_team,
                    time_fora: away_team,
                    gols_casa: home_goals,
                    gols_fora: away_goals,
                    resultado_texto: `${home_team} ${home_goals} x ${away_goals} ${away_team}` 
                })
            })
            rounds.push(roundData)
        })
        return rounds
    } catch(err){
        throw err
    }
}
