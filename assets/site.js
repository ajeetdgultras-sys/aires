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
document.querySelectorAll('a[href^="mailto:"]').forEach(link=>{link.href=`mailto:${contactEmail}`;if(link.textContent.includes('@'))link.textContent=contactEmail});
document.querySelectorAll('.header-phone').forEach(link=>{link.href=contactPhoneHref;link.textContent=contactPhone;link.setAttribute('aria-label',`Call Aires Linehaul on ${contactPhone}`)});
const header=document.querySelector('.site-header');
if(header&&!header.querySelector('.header-phone')){const phone=document.createElement('a');phone.className='header-phone';phone.href=contactPhoneHref;phone.textContent=contactPhone;phone.setAttribute('aria-label',`Call Aires Linehaul on ${contactPhone}`);header.insertBefore(phone,header.querySelector('.header-cta'))}
const button=document.querySelector('.menu');
button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});
nav?.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false')});
const form=document.querySelector('#contact-form');
form?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Website enquiry — ${data.get('service')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')||'Not provided'}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\n\nMovement details:\n${data.get('message')}`);window.location.href=`mailto:${contactEmail}?subject=${subject}&body=${body}`});
