import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from "@/components/Footer.vue";

describe('Footer', () => {
    it('renders the footer with all sections', () => {
        const wrapper = mount(Footer, {
            global: {
                stubs: {
                    'RouterLink': true
                }
            }
        });
        expect(wrapper.find('footer').exists()).toBe(true);
        expect(wrapper.findAll('.footer-section').length).toBe(3);
    });

    it('displays the correct copyright text', () => {
        const wrapper = mount(Footer, {
            global: {
                stubs: {
                    'RouterLink': true
                }
            }
        });
        const copyrightText = wrapper.find('.footer-section.left p').text();
        expect(copyrightText).toBe('© 2024 Quizzebassen. All rights reserved.');
    });

    it('contains a valid logo in the left section', () => {
        const wrapper = mount(Footer, {
            global: {
                stubs: {
                    'RouterLink': true
                }
            }
        });
        const logo = wrapper.find('.footer-section.left img');
        expect(logo.exists()).toBe(true);
        expect(logo.attributes('src')).toContain('QBlogo.png');
    });


    it('contains a contact link with a logo in the right section', () => {
        const wrapper = mount(Footer, {
            global: {
                stubs: {
                    'RouterLink': true
                }
            }
        });
        const contactLink = wrapper.find('.footer-section.right .footer-link');
        expect(contactLink.exists()).toBe(true);
        expect(contactLink.attributes('href')).toBe('mailto:support@quizzebassen.com');
        expect(contactLink.text()).toContain('Contact');
        const contactLogo = contactLink.find('img');
        expect(contactLogo.exists()).toBe(true);
        expect(contactLogo.attributes('src')).toContain('contact.png');
    });
});
