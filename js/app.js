console.log("Tony's portfolio")

// navbar toggler click event
$('.navbar-toggler').on('click', function() {
    this.classList.toggle('opened')
    $('.navbar').toggleClass('border-radius-LL')
})

// navbar click then slide down to the section
$(document).on('click', 'a[href^="#"]', function(e) {
    if (this.innerText!== '') {
        this.classList.add('active')
    }
    $('.navbar-toggler').toggleClass('opened')
    $('.navbar-toggler').toggleClass('collapsed')
    $('.navbar-toggler').attr('aria-expanded', function() {
        return this.ariaExpanded ? false : true
    } )
    $('.navbar-collapse').toggleClass('show')
});

// highlight nav item based on page position
function debounce(func, wait = 100, immediate = false) {
    let timeout;
    return function() {
        const context = this,
            args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

const sections = document.querySelectorAll('section')
function highlightNavItem() {
    sections.forEach(sec => {
        const winBottom = window.scrollY + window.innerHeight
        const sectionShowing = sec.offsetTop + window.innerHeight/4
        const sectionBottom = sec.offsetTop + sec.offsetHeight + window.innerHeight/4
        const highlightItem = winBottom >= sectionShowing
        const sectionPassed = winBottom > sectionBottom
        if (highlightItem && !sectionPassed) {
            $('.nav-link').removeClass('active')
            $(`#${sec.id}-link`).addClass('active')
        }
    })
}

$(window).on('scroll', debounce(highlightNavItem) )

// creating portfolio section
const portfolioContentHtml = portfolio.map((proj, i) => {
    const github = proj.github ? `<a href="${proj.github}" target="_blank"><i class="fab fa-github-square fa-2x"></i></a>` : '';
    const link = proj.link ? `<a href="${proj.link}" target="_blank" class="ext-link"><i class="fas fa-external-link-square-alt fa-2x"></i></a>` : '';

    const html1a = `
    <div class="project wrap">
    <div class="proj-header">
        <a href="${proj.link}" target="_blank">
            <h4><span>${proj.css}: </span>${proj.title}</h4>
        </a>
        <div class="link">
            ${github}
            ${link}
        </div>
    </div>
        <div class="proj-card">
    `
    const html1b = proj.useIFrame ?
    `   <iframe src="${proj.link}" target="_blank" class="proj-img-link proj-img"></iframe>`
    :
    `
        <a href="${proj.link || proj.github}" target="_blank" class="proj-img-link"><img class="proj-img" src="${proj.img}" alt="Project image"></a>
    `

    const html1c = `
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
    return html1a + html1b + html1c + html2 + html3

}).join('')

$('.project-list').append(portfolioContentHtml)
