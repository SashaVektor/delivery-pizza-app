export const smoothScrollToCategory = (categoryId: string) => {
    const categoryElement = document.getElementById(categoryId);

    if (categoryElement) {
        const offset = window.innerWidth <= 639 ? 110 : 140;

        window.scrollTo({
            top: categoryElement.offsetTop - offset,
            behavior: "smooth",
        });
    }
};