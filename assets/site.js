const servicesNav=[
  ['interstate-linehaul','Interstate Linehaul'],
  ['container-transport','20ft Container Transport'],
  ['scheduled-road-services','Scheduled Road Services'],
  ['overflow-contract-capacity','Overflow & Contract Capacity'],
  ['a-double-port-transport','A-Double Port Transport'],
  ['b-double-skel-transport','B-Double Skel Transport'],
  ['flatbed-drop-deck','Flatbed & Drop Deck'],
  ['interstate-container-linehaul','Interstate Container Linehaul'],
  ['rail-pickup-drop-off','Rail Pickup & Drop-Off'],
  ['reach-stacker-services','Reach Stacker Services'],
  ['side-loader-transport','Side Loader Transport'],
  ['wharf-transport','Wharf Transport Services']
];
const contactPhone='+61 452 217 808';
const contactPhoneHref='tel:+61452217808';
const contactEmail='lakra@airesrelocations.com.au';
const contactAddress='9 Maughan Way, Cranbourne West VIC 3977, Australia';
const nav=document.querySelector('#nav');
const servicesLink=[...nav.querySelectorAll('a')].find(link=>link.textContent.trim().startsWith('Our Services'));
if(servicesLink){
  let dropdown=servicesLink.closest('.nav-dropdown');
  if(!dropdown){
    dropdown=document.createElement('div');
    dropdown.className='nav-dropdown';
    servicesLink.replaceWith(dropdown);
    dropdown.appendChild(servicesLink);
  }
  servicesLink.href='/services/';
  servicesLink.innerHTML='Our Services <span>⌄</span>';
  let submenu=dropdown.querySelector('.submenu');
  if(!submenu){submenu=document.createElement('div');submenu.className='submenu';dropdown.appendChild(submenu)}
  submenu.innerHTML=servicesNav.map(([slug,label])=>`<a href="/services/${slug}/">${label}</a>`).join('');
}
document.querySelectorAll('a[href^="mailto:"]').forEach(link=>{link.href=`mailto:${contactEmail}`;if(link.textContent.includes('@')||link.closest('footer'))link.textContent=contactEmail});
document.querySelectorAll('.header-phone').forEach(link=>{link.href=contactPhoneHref;link.textContent=contactPhone;link.setAttribute('aria-label',`Call Aires Linehaul on ${contactPhone}`)});
const footerContact=[...document.querySelectorAll('footer .footer-grid>div')].find(section=>section.querySelector('h3')?.textContent.trim().toLowerCase()==='contact');
if(footerContact&&!footerContact.querySelector('.footer-contact-details')){
  const details=document.createElement('div');
  details.className='footer-contact-details';
  details.innerHTML=`<span><b>Address</b>${contactAddress}</span><a href="${contactPhoneHref}">${contactPhone}</a><span><b>Office Hours</b>Monday–Friday, 9:00am–5:00pm</span><span><b>Operating Hours</b>24 hours, Monday–Sunday<br>365 days a year</span>`;
  footerContact.appendChild(details);
}
document.querySelectorAll('.footer-map h3').forEach(title=>title.textContent='Cranbourne West, Victoria');
document.querySelectorAll('iframe[title*="Map showing"]').forEach(map=>map.src='https://www.google.com/maps?q='+encodeURIComponent(contactAddress)+'&output=embed');
const header=document.querySelector('.site-header');
if(header&&!header.querySelector('.header-phone')){const phone=document.createElement('a');phone.className='header-phone';phone.href=contactPhoneHref;phone.textContent=contactPhone;phone.setAttribute('aria-label',`Call Aires Linehaul on ${contactPhone}`);header.insertBefore(phone,header.querySelector('.header-cta'))}
const button=document.querySelector('.menu');
button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});
nav?.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false')});
if(!document.querySelector('.mobile-contact-actions')){
  const actions=document.createElement('div');
  actions.className='mobile-contact-actions';
  actions.setAttribute('aria-label','Quick contact options');
  actions.innerHTML=`<a class="mobile-call" href="${contactPhoneHref}" aria-label="Call Aires Linehaul"><span aria-hidden="true">☎</span> Call</a><a class="mobile-whatsapp" href="https://wa.me/61452217808?text=${encodeURIComponent('Hi Aires Linehaul, I would like to discuss a transport requirement.')}" target="_blank" rel="noopener noreferrer" aria-label="Message Aires Linehaul on WhatsApp"><span aria-hidden="true">◉</span> WhatsApp</a>`;
  document.body.appendChild(actions);
}
const form=document.querySelector('#contact-form');
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(location.hostname.endsWith('vercel.app')){
    const data=new FormData(form);
    const subject=encodeURIComponent(`Website enquiry — ${data.get('service')}`);
    const body=encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')||'Not provided'}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\n\nMovement details:\n${data.get('message')}`);
    window.location.href=`mailto:${contactEmail}?subject=${subject}&body=${body}`;
    return;
  }
  const submit=form.querySelector('button[type="submit"]');
  const note=form.querySelector('#form-note');
  submit.disabled=true;
  submit.textContent='Sending…';
  note.textContent='Sending your enquiry…';
  note.className='form-note';
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    const result=await response.json();
    if(!response.ok||!result.ok)throw new Error(result.message||'Unable to send your enquiry.');
    form.reset();
    note.textContent='Thank you. Your enquiry has been sent to the Aires team.';
    note.className='form-note success';
  }catch(error){
    note.textContent=error.message||'Unable to send right now. Please call or email our team.';
    note.className='form-note error';
  }finally{
    submit.disabled=false;
    submit.textContent='Send Enquiry';
  }
});
