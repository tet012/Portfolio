document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects');
            const menuContainer = document.getElementById('menu');

            projects.forEach((project, index) => {
                // Create menu item
                const menuItem = document.createElement('p');
                menuItem.classList.add('text-neutral-400', 'hover:text-neutral-950', 'transition', 'cursor-pointer', 'hover:underline');
                menuItem.textContent = project.name;
                menuItem.dataset.target = `project-${index}`;

                menuItem.addEventListener('click', () => {
                    document.getElementById(menuItem.dataset.target).scrollIntoView({ behavior: 'smooth' });
                });

                menuContainer.appendChild(menuItem);

                // Create project container
                const projectElement = document.createElement('div');
                projectElement.classList.add('flex', 'flex-col', 'gap-y-16', 'opacity-0', 'animate-fade-in', 'p-4');
                projectElement.id = `project-${index}`;

                // Create header section
                const headerElement = document.createElement('div');
                headerElement.classList.add('flex', 'flex-col', 'gap-y-8');

                const nameElement = document.createElement('h2');
                nameElement.classList.add('md:text-8xl', 'tracking-wide', 'text-4xl');
                nameElement.textContent = project.name;

                headerElement.appendChild(nameElement);

                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('columns-1', 'md:columns-2', 'md:gap-x-8');

                const fullDescriptionElement = document.createElement('p');
                fullDescriptionElement.classList.add('text-justify', 'text-neutral-700');
                fullDescriptionElement.textContent = project.description;

                descriptionElement.appendChild(fullDescriptionElement);

                headerElement.appendChild(descriptionElement);

                // Create image container
                const imgContElement = document.createElement('div');
                imgContElement.classList.add('flex', 'rounded-md', 'overscroll-contain', 'grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-1');

                project.images.forEach(imageSrc => {
                    const imgElement = document.createElement('img');
                    imgElement.classList.add('rounded-md', 'cursor-pointer');
                    imgElement.src = imageSrc;
                    imgElement.alt = project.name;
                    imgContElement.appendChild(imgElement);
                });

                // Create footer section
                const footerElement = document.createElement('div');
                footerElement.classList.add('flex', 'gap-y-4', 'justify-between', 'align-middle', 'md:flex-row', 'flex-col', 'border-t', 'solid', 'border-neutral-200', 'pt-4');

                const linksContainer = document.createElement('div');
                linksContainer.classList.add('flex', 'gap-4', 'md:align-middle', 'md:justify-center');

                const linksList = document.createElement('div');
                linksList.classList.add('flex', 'gap-4');

                project.links.forEach(link => {
                    const linkElement = document.createElement('p');
                    linkElement.classList.add('text-neutral-400', 'hover:text-neutral-600', 'active:text-neutral-600', 'transition', 'cursor-pointer');
                    linkElement.textContent = new URL(link).hostname;
                    linkElement.onclick = () => window.open(link, '_blank');
                    linksList.appendChild(linkElement);
                });

                linksContainer.appendChild(linksList);

                const fullCollectionLink = document.createElement('div');
                fullCollectionLink.classList.add('flex', 'gap-y-4');

                const collectionLink = document.createElement('a');
                collectionLink.href = project.featureLink;
                collectionLink.classList.add('text-center', 'underline');
                collectionLink.textContent = "View full collection";

                fullCollectionLink.appendChild(collectionLink);

                footerElement.appendChild(linksContainer);
                footerElement.appendChild(fullCollectionLink);

                // Assemble project element
                projectElement.appendChild(imgContElement);
                projectElement.appendChild(headerElement);
                projectElement.appendChild(footerElement);

                projectsContainer.appendChild(projectElement);
            });

            // Add scroll event listener to trigger animations and change menu item styles
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const targetMenuItem = document.querySelector(`[data-target="${entry.target.id}"]`);
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-show');
                        if (targetMenuItem) {
                            targetMenuItem.classList.add('menuActive');
                        }
                    } else {
                        if (targetMenuItem) {
                            targetMenuItem.classList.remove('menuActive');
                        }
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.animate-fade-in').forEach(el => {
                observer.observe(el);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});
