console.log("Tony's portfolio")



$(document).on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

const proj = portfolio[0]
console.log(proj)

const portfolioContentHtml = portfolio.map(proj => {
    
    const html1 = `
    <div class="project wrap">
    <div class="proj-header">
        <a href="${proj.link}">
            <h4><span>${proj.css}: </span>${proj.title}</h4>
        </a>
        <div class="link">
            <a href="${proj.github}" target="_blank"><i class="fab fa-github-square fa-2x"></i></a>
            <a href="${proj.link}" target="_blank"><i class="fas fa-external-link-square-alt fa-2x"></a></i></a>
        </div>
    </div>
        <div class="proj-card">
            <img class="proj-img" src="${proj.img}" alt="Project image">
            <div class="proj-desc">
                <ul class="highlight">
    `

    const html2 = proj.skillsApplied.map(skill => {
        return `<li>${skill}</li>`
    }).join('')

    const html3 = `
                </ul>
                <p>${proj.desc}</p>
            </div>
        </div> 
    </div>
    `
    return html1 + html2 + html3
}).join('')

$('.project-list').append(portfolioContentHtml)