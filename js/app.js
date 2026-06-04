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

function getPositionClass(position, competition) {

    switch (competition) {

        // Eredivisie
        case "2003":

            if (position <= 2) return "ucl";

            if (position === 3) return "ucl-qual";

            if (position === 4) return "uel";

            if (position >= 5 && position <= 8) return "uecl";

            if (position === 16) return "playoff";

            if (position >= 17) return "relegation";

            break;

        // Premier League
        case "2021":

            if (position <= 4) return "ucl";

            if (position === 5) return "uel";

            if (position === 6) return "uecl";

            if (position >= 18) return "relegation";

            break;

        // La Liga
        case "2014":

            if (position <= 4) return "ucl";

            if (position === 5 || position === 6) return "uel";

            if (position === 7) return "uecl";

            if (position >= 18) return "relegation";

            break;

        // Bundesliga
        case "2002":

            if (position <= 4) return "ucl";

            if (position === 5) return "uel";

            if (position === 6) return "uecl";

            if (position >= 17) return "relegation";

            break;

        // Serie A
        case "2019":

            if (position <= 4) return "ucl";

            if (position === 5) return "uel";

            if (position === 6) return "uecl";

            if (position >= 18) return "relegation";

            break;
    }

    return "";
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

            const positionClass =
                getPositionClass(
                    team.position,
                    competition
                );

            standings.innerHTML += `
                <tr>

                    <td class="position-cell">

                        <div class="position-wrapper">

                            <span class="position-bar ${positionClass}"></span>

                            <strong>${team.position}</strong>

                        </div>

                    </td>

                    <td>

                        <div class="d-flex align-items-center gap-2">

                            <img
                                src="${team.team.crest}"
                                alt="${team.team.name}"
                                width="28"
                                height="28"
                                style="object-fit:contain;"
                            >

                            ${team.team.name}

                        </div>

                    </td>

                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>

                    <td>
                        <strong>${team.points}</strong>
                    </td>

                    <td>${team.goalsFor}</td>

                    <td>${team.goalsAgainst}</td>

                    <td>${team.goalDifference}</td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        standings.innerHTML = `
            <tr>
                <td colspan="10"
                    class="text-center text-danger">

                    Er is iets fout gegaan bij het laden van de standen.

                </td>
            </tr>
        `;
    }
}

leagueSelect.addEventListener(
    "change",
    loadStandings
);

loadStandings();