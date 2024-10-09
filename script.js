gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
    totalSections: 9,
    scaleAmount: 1.3,
    additionalScrollDistance: 0.5,
    scrubAmount: 1,
    clipPathScrubAmount: 0.125,
};

function addImageScaleAnimation() {
    gsap.utils.toArray("section").forEach((section, index) => {
        const image = document.querySelector(`#case-img__${index + 1}`);
        if (!image) return;

        const startCondition = index === 0 ? "top top" : "bottom bottom";

        gsap.to(image.querySelector('img'), {
            scrollTrigger: {
                trigger: section,
                start: startCondition,
                end: () => {
                    const viewportHeight = window.innerHeight;
                    const sectionBottom = section.offsetTop + section.offsetHeight;
                    const additionalDistance = viewportHeight * CONFIG.additionalScrollDistance;
                    const endValue = sectionBottom - viewportHeight + additionalDistance;
                    return `+=${endValue}`;
                },
                scrub: CONFIG.scrubAmount,
            },
            scale: CONFIG.scaleAmount,
            ease: "none",
        });
    });
}

function animateClipPath(
    sectionId,
    previewId,
    startClipPath,
    endClipPath,
    start = "top center",
    end = "bottom top"
) {
    let section = document.querySelector(sectionId);
    let preview = document.querySelector(previewId);
    if (!section || !preview) return;

    ScrollTrigger.create({
        trigger: section,
        start: start,
        end: end,
        onEnter: () => {
            gsap.to(preview, {
                scrollTrigger: {
                    trigger: section,
                    start: start,
                    end: end,
                    scrub: CONFIG.clipPathScrubAmount,
                },
                clipPath: endClipPath,
                ease: "none",
            });
        },
    });
}

function initializeAnimations() {
    animateClipPath(
        "#case-1",
        "#case-img__1",
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    );

    for (let i = 2; i <= CONFIG.totalSections; i++) {
        let currentSection = `#case-${i}`;
        let prevPreview = `#case-img__${i - 1}`;
        let currentPreview = `#case-img__${i}`;

        animateClipPath(
            currentSection,
            prevPreview,
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            "top bottom",
            "center center"
        );

        if (i < CONFIG.totalSections) {
            animateClipPath(
                currentSection,
                currentPreview,
                "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                "center center",
                "bottom top"
            );
        }
    }
}

addImageScaleAnimation();
initializeAnimations();