const standings = document.getElementById("standings");
const API_KEY = "3fd1a403a8eb487a8c191e32c413d5fe";
async function loadStandings() {
    try {
        const response = await fetch(
            "https://api.football-data.org/v4/competitions/DED/standings",
            {
                headers: {
                    "X-Auth-Token": API_KEY
                }
            }
        );

        const data = await response.json();
        const teams = data.standings[0].table;
        standings.innerHTML = "";
        teams.forEach(team => {
            standings.innerHTML += `
                <tr>
                    <td>${team.position}</td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td><strong>${team.points}</strong></td>
                </tr>
            `;
        });

    } catch(error) {
        console.error(error);
    }
}

loadStandings();