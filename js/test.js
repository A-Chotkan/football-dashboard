async function getTeams() {

    const response = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Dutch%20Eredivisie"
    );

    const data = await response.json();

    console.log(data);

}

getTeams();