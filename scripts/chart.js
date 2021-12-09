(async function() {
    const ctx = document.getElementById('myChart');
    const datasUserClass = document.querySelector('.datasUser');
    const buttonSearch = document.querySelector('.search');
    const inputSearchUser = document.querySelector('.search-user-input');
    const searchDiv = document.querySelector('.search-user-div');
    const imageLogo = document.querySelector('.image-logo');
    const image404 = document.querySelector('.image-404');
    const returnIndex = document.querySelector('.return');

    const url = "https://api.github.com/users";
    let datasUser = '';
    let qtdRepositories;
    let followers;
    let following;

    async function getUser(user) {
        const profileResponse = await fetch(
            `${url}/${user}`
        );
    
        const profile = await profileResponse.json();
    
        return profile;
    }

    if (datasUser === '') {
        ctx.style.display = 'none';

        imageLogo.innerHTML = `
            <img src="../assets/undraw_programmer_re_owql.svg" alt="A girl in your computer personal">
        `
    }

    buttonSearch.addEventListener('click', async (event) => {
        event.preventDefault();

        if(inputSearchUser.value !== '') {
            searchDiv.style.display = 'none';
            ctx.style.display = 'flex';
            imageLogo.style.display = 'none';

            datasUser = await getUser(inputSearchUser.value);

            qtdRepositories = datasUser.public_repos;
            followers = datasUser.followers;
            following = datasUser.following;

            if (datasUser.hasOwnProperty('login')) {
                returnIndex.innerHTML = `
                    <a href="./index.html">
                        <i class="fas fa-arrow-left" id="icon-return"></i>
                    </a>
                `;
    
                datasUserClass.innerHTML = `
                    <img class="userImage" src=${datasUser.avatar_url} alt="User image">
                    <div class="nameAndBio">
                        <p>${datasUser.login}</p>
                        <span>${datasUser.bio}</span>
                    </div>
                `
            } else {
                ctx.style.display = 'none';
    
                image404.innerHTML = `
                    <img src="../assets/undraw_page_not_found_re_e9o6.svg" alt="">
                    <a href="./index.html">Voltar</a>
                `
            }
        }  else {
            alert('Preencha todos os campos!')
        }

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        
            responsive: false,
        
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Dados do usuário",
                    padding: {
                        top: 10
                    },
                },
            }
        }
        
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Seguidores', 'Seguindo', 'Quantidade de Repositórios'],
                datasets: [{
                    data: [followers, following, qtdRepositories],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: options
        });
    })
})()