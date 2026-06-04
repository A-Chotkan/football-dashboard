const standings = document.getElementById("standings");
const leagueSelect = document.getElementById("leagueSelect");

function getLeagueName() {

    switch (leagueSelect.value) {

        case "Eredivisie":
            return "Dutch Eredivisie";

        case "Premier League":
            return "English Premier League";

        case "La Liga":
            return "Spanish La Liga";

        default:
            return "Dutch Eredivisie";
    }

}

async function getTeams() {

    try {

        standings.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    Teams laden...
                </td>
            </tr>
        `;

        const league = getLeagueName();

        const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`
        );

        const data = await response.json();
        console.log(data.teams.length);
        standings.innerHTML = "";

        if (!data.teams) {

            standings.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">
                        Geen teams gevonden.
                    </td>
                </tr>
            `;

            return;
        }

        data.teams.forEach((team, index) => {

            standings.innerHTML += `
                <tr>
                    <td>${index + 1}</td>

                    <td>
                        <div class="d-flex align-items-center gap-2">

                            <img
                                src="${team.strBadge}"
                                alt="${team.strTeam}"
                                width="35"
                                height="35"
                                style="object-fit:contain;"
                            >

                            <span>${team.strTeam}</span>

                        </div>
                    </td>

                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        standings.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Er is iets fout gegaan.
                </td>
            </tr>
        `;

    }

}

leagueSelect.addEventListener("change", () => {
    getTeams();
});

getTeams();