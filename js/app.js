const standings = document.getElementById("standings");
const leagueSelect = document.getElementById("leagueSelect");

function getCompetitionCode() {

    switch (leagueSelect.value) {

        case "Eredivisie":
            return "2003";

        case "Premier League":
            return "2021";

        case "La Liga":
            return "2014";

        case "Bundesliga":
            return "2002";

        case "Serie A":
            return "2019";

        default:
            return "2003";
    }
}

async function loadStandings() {

    try {
        const competition = getCompetitionCode();
        const response = await fetch(
            `api/standings.php?competition=${competition}`
        );

        const data = await response.json();
        const teams = data.standings[0].table;
        standings.innerHTML = "";
        teams.forEach(team => {

            standings.innerHTML += `
                <tr>
                    <td>${team.position}</td>

                    <td>
                        <div class="d-flex align-items-center gap-2">

                            <img
                                src="${team.team.crest}"
                                alt="${team.team.name}"
                                width="30"
                                height="30"
                                style="object-fit:contain;"
                            >

                            ${team.team.name}

                        </div>
                    </td>

                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td><strong>${team.points}</strong></td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        standings.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Er is iets fout gegaan bij het laden van de standen.
                </td>
            </tr>
        `;
    }
}

leagueSelect.addEventListener("change", () => {
    loadStandings();
});

loadStandings();