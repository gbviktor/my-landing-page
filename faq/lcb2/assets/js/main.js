const categoriesEl = document.getElementById('faq-categories');
const faqItemsEl = document.getElementById('faq-items');

let faqData = {};
let activeItem = null;

fetch('./assets/faq-data.json')
    .then(r => r.json())
    .then(data => {
        faqData = data;
        renderCategories();
        setCategory(Object.keys(data)[0]);
    });

function renderCategories() {
    categoriesEl.innerHTML = '';

    Object.keys(faqData).forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = `
            w-full text-left px-4 py-2 rounded-lg
            border border-purple-500/20
            text-gray-300
            hover:text-white hover:bg-purple-500/20
            transition
        `;
        btn.onclick = () => setCategory(cat);
        if (i === 0) btn.classList.add('bg-purple-500/20', 'text-white');
        categoriesEl.appendChild(btn);
    });
}

function setCategory(category) {
    activeItem = null;

    [...categoriesEl.children].forEach(btn =>
        btn.classList.toggle(
            'bg-purple-500/20',
            btn.textContent === category
        )
    );

    faqItemsEl.innerHTML = '';
    faqData[category].forEach(renderItem);
}

function renderItem(item) {
    const wrapper = document.createElement('div');
    wrapper.className = `
        bg-slate-900/60 rounded-xl
        border border-purple-500/20
        p-6 transition
    `;

    wrapper.innerHTML = `
        <button class="w-full flex justify-between items-center text-left">
            <h3 class="text-lg md:text-xl font-semibold text-white">
                ${item.title}
            </h3>
            <span class="icon text-purple-400 text-2xl transition-transform">+</span>
        </button>

        <div class="content overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
            <div class="faq-answer mt-2 text-gray-400 leading-relaxed text-sm">${item.answer}</div>
        </div>
    `;

    const btn = wrapper.querySelector('button');
    const content = wrapper.querySelector('.content');
    const icon = wrapper.querySelector('.icon');

    btn.onclick = () => toggleItem(wrapper, content, icon);

    faqItemsEl.appendChild(wrapper);
}

function toggleItem(wrapper, content, icon) {
    const isOpen = activeItem === wrapper;

    document.querySelectorAll('#faq-items > div').forEach(el => {
        el.querySelector('.content').style.maxHeight = null;
        el.querySelector('.icon').style.transform = 'rotate(0deg)';
    });

    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
        activeItem = wrapper;
    } else {
        activeItem = null;
    }
}