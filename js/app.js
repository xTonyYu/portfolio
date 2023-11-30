console.log("Tony's portfolio")
const sections = document.querySelectorAll('section')
const projectList = document.querySelector('.project-list')

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

// highlight the corresponding navbar item when scroll to the section on the page
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

function debounce(func, wait = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => { func.apply(this, args) }, wait);
    };
}

$(window).on('scroll', debounce(highlightNavItem))


// creating portfolio section
const createProjectDiv = (proj) => {
    const projectDiv = document.createElement('div')
    const projHeader = createProjHeader(proj)
    const projCard = createProjCard(proj)

    projectDiv.classList.add("project", "wrap")
    projectDiv.insertAdjacentElement('beforeend', projHeader)
    projectDiv.insertAdjacentElement('beforeend', projCard)

    // add more projects within the "animation" project section
    if (proj.css === 'animation') {
        moreAnimationProj(projectDiv)
    }

    return projectDiv
}

const createProjHeader = (proj) => {
    const projHeader = document.createElement('div')
    const aTag = document.createElement('a')

    projHeader.classList.add("proj-header")

    aTag.href = proj.link || proj.github
    aTag.target = '_blank'
    aTag.innerHTML = `<h4><span>${proj.css}: </span>${proj.title}</h4>`
    projHeader.insertAdjacentElement('beforeend', aTag)

    return projHeader
}

const createProjCard = (proj) => {
    const projCard = document.createElement('div')
    const iFrameOrATag = createIFrameOrATag(proj)
    const projDesc = createProjDesc(proj)

    projCard.classList.add("proj-card")
    projCard.insertAdjacentElement('beforeend', iFrameOrATag)
    projCard.insertAdjacentElement('beforeend', projDesc)

    return projCard
}

const createIFrameOrATag = (proj) => {
    let tag;
    if (proj.useIFrame) {
        tag = document.createElement('iframe')
        tag.src = proj.link
        tag.classList.add("proj-img")
    } else {
        tag = document.createElement('a')
        tag.href = proj.link || proj.github
        tag.innerHTML = `<img class="proj-img" src="${proj.img}" alt="Project ${proj.title} image">`
    }

    tag.target = '_blank'
    tag.classList.add("proj-img-link")

    return tag
}

const createProjDesc = (proj) => {
    const projDesc = document.createElement('div')
    const skillsAndLinks = createSkillsAndLinks(proj)
    // const skillList = createUlTag(proj)
    // const projLinks = createProjLinks(proj)
    const desc = document.createElement('p')

    desc.innerHTML = proj.desc

    projDesc.classList.add("proj-desc")
    projDesc.insertAdjacentElement('beforeend', skillsAndLinks)
    // projDesc.insertAdjacentElement('beforeend', skillList)
    // projDesc.insertAdjacentElement('beforeend', projLinks)
    projDesc.insertAdjacentElement('beforeend', desc)

    return projDesc
}

const createSkillsAndLinks = (proj) => {
    const skillsNLinks = document.createElement('div')
    const skillList = createUlTag(proj)
    const projLinks = createProjLinks(proj)

    skillsNLinks.classList.add('skills-n-links')
    skillsNLinks.insertAdjacentElement('beforeend', skillList)
    skillsNLinks.insertAdjacentElement('beforeend', projLinks)

    return skillsNLinks
}

const createUlTag = (proj) => {
    const ulTag = document.createElement('ul')

    proj.skillsApplied.forEach(skill => {
        const liTag = document.createElement('li')
        liTag.innerHTML = skill
        ulTag.insertAdjacentElement('beforeend', liTag)
    })

    return ulTag
}

const createProjLinks = (proj) => {
    const linkDiv = document.createElement('div')
    const github = proj.github ? `<a href="${proj.github}" target="_blank"><i class="fab fa-github-square fa-2x"></i></a>` : '';
    const link = proj.link ? `<a href="${proj.link}" target="_blank" class="ext-link"><i class="fas fa-external-link-square-alt fa-2x"></i></a>` : '';

    linkDiv.classList.add('link')
    linkDiv.innerHTML = `${github} ${link}`

    return linkDiv
}

const moreAnimationProj = (projectDiv) => {
    moreAnimations.forEach((proj) => {
        const projCard = createProjCard(proj)
        projectDiv.insertAdjacentElement('beforeend', projCard)
    })
}

portfolio.map((proj) => {
    const project = createProjectDiv(proj)
    projectList.insertAdjacentElement('beforeend', project)
})
