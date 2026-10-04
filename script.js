// القائمة
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {navToggle.addEventListener('click', ()=> {navMenu.classList.add('show-menu')})}
if (navClose) {navClose.addEventListener('click', ()=> {navMenu.classList.remove('show-menu')})}

const navLink = document.querySelectorAll('.nav-link')

const linkAction = ()=> {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')}
     
navLink.forEach(n => n.addEventListener('click', linkAction))

// زر الرجوع للبداية
let up = document.querySelector(".arrow-up");
window.onscroll = function () {
    if (this.scrollY >= 700) { up.classList.add("show"); } 
    else { up.classList.remove("show"); }};

// منع مستخدمين الأجهزة الأصغر من 1024px من التمرير بالموقع والقائمة مفتوحة والسماح لهم عند إغلاقها
document.querySelector('.nav-toggle').addEventListener('click', function() {document.body.style.overflow = 'hidden'})
document.querySelector('.nav-close').addEventListener('click', function() {document.body.style.overflow = 'auto'})
document.querySelectorAll('.nav-item').forEach(function(navItem) {navItem.addEventListener('click', function() {document.body.style.overflow = 'auto'})})

// أوامر لصفحة about-me
document.addEventListener('DOMContentLoaded', function() {
    const certsBtn = document.getElementById('certsBtn');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    const popupContent = document.getElementById('popupContent');
    const dots = document.querySelectorAll('.dot');
    const certs = document.querySelectorAll('.cert');
    const bugsBtn = document.getElementById('bugsbtn');
    const bugsPopup = document.getElementById('bugsPopup');
    const closeBugsBtn = document.getElementById('closeBugsBtn');
    let currentIndex = 0;
    const totalCerts = certs.length;

    function disableScroll() { document.body.classList.add('no-scroll'); }
    function enableScroll() { document.body.classList.remove('no-scroll'); }

    certsBtn.addEventListener('click', function () {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        disableScroll(); });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        enableScroll(); });

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) { dot.classList.add('active'); }}); }

    document.getElementById('nextBtn').addEventListener('click', function () {
        if (currentIndex < totalCerts - 1) {
            currentIndex++;
            popupContent.style.transform = `translateX(${currentIndex * 100}%)`;
            updateDots(); }});

    document.getElementById('prevBtn').addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            popupContent.style.transform = `translateX(${currentIndex * 100}%)`;
            updateDots(); } });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            currentIndex = index;
            popupContent.style.transform = `translateX(${currentIndex * 100}%)`;
            updateDots(); }); });
        
    bugsBtn.addEventListener('click', function () {
        bugsPopup.style.display = 'block';
        overlay.style.display = 'block';
        disableScroll(); });

    closeBugsBtn.addEventListener('click', function () {
        bugsPopup.style.display = 'none';
        overlay.style.display = 'none';
        enableScroll(); }); });

// شركاء النجاح
document.querySelectorAll(".partner-row").forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // سحب بالماوس
    row.addEventListener("mousedown", e => {
        isDown = true;
        row.classList.add("paused");
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft });

    row.addEventListener("mouseleave", () => {
        isDown = false;
        row.classList.remove("paused"); });

    row.addEventListener("mouseup", () => {
        isDown = false;
        row.classList.remove("paused"); });

    row.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = (x - startX) * 2;
        row.scrollLeft = scrollLeft - walk; });

    // إيقاف التحريك عند الوقوف عليه
    row.addEventListener("mouseenter", () => { row.style.animationPlayState = "paused"; });
    row.addEventListener("mouseleave", () => { row.style.animationPlayState = "running"; }); });

// تعديلات على صفحة works
function showProject(id) { document.getElementById(id).style.display = 'block'; }
function closeProject(id) { document.getElementById(id).style.display = 'none'; }

document.querySelectorAll('.close-project').forEach(function(closeProject) {closeProject.addEventListener('click', function() {document.body.style.overflow = 'auto'}); });
document.querySelectorAll('.project:not(.project3)') .forEach(function (card) { card.addEventListener('click', function () { document.body.style.overflow = 'hidden'; }); });

// التقييمات
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reviews-cards');
    const cards = Array.from(track.children);
    const dotsContainer = document.querySelector('.reviews-dots');
    let currentIndex = 0;

    cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.append(dot); });
    const dots = Array.from(dotsContainer.children);

    function updateDots() {
        dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
        }); }

    function goToSlide(idx) {
        currentIndex = idx;
        const card = cards[idx];
        const offset = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        track.scrollTo({ left: offset, behavior: 'smooth' });
        updateDots(); }

    document.querySelector('.reviews-arrow.prev').addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        goToSlide(prevIndex); });

    document.querySelector('.reviews-arrow.next').addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        goToSlide(nextIndex); }); });

// خاصية إرسال رسائل البريد الالكتروني
function showToast(message, isSuccess) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = ''; 
    toast.classList.add(isSuccess ? 'success' : 'error', 'show');
  
    setTimeout(() => { toast.classList.remove('show'); }, 5000); }
  
function sendMail() {
    const params = {
        user_email: document.getElementById('user_email').value,
        user_name:  document.getElementById('user_name').value,
        user_msg:   document.getElementById('user_msg').value };
  
    emailjs.init('6CdPFJ5dngZ4t0ID2');
    emailjs.send('service_fbfyhsr', 'template_g4zcz1a', params)
        .then(res => { showToast('وصلت الرسالة ✅ سيتم الرد عليك بأسرع وقت ممكن بإذن الله.', true); })
        .catch(err => {
            console.error('EmailJS Error:', err);
            showToast(' الرسالة ماوصلت ❌', false); }); }

// التأثيرات
// Fade In
const fadeElements = document.querySelectorAll('.fade-in-top, .fade-in-bottom, .fade-in-right, .fade-in-left');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); } }); }, 
        { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));