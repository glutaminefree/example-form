import { mount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import flushPromises from 'flush-promises';
import Form from '@/components/Form.vue';

const localVue = createLocalVue();

localVue.use(Buefy);
localVue.use(VeeValidate);

localVue.directive('mask', {});

describe('Form', () => {
  const testAttr = 'data-test';
  const rootName = 'form';
  const fieldName = 'input';
  const submitName = 'submit';
  const fieldsCount = 4;
  const errorClass = 'is-danger';
  const formSavedText = 'Saved!';

  const wrapper = mount(Form, { localVue });

  const fields = wrapper.findAll(`[${testAttr}="${fieldName}"]`);
  const submitButton = wrapper.find(`[${testAttr}="${submitName}"]`);

  const fillForm = async (formData) => {
    wrapper.setData(formData);
    submitButton.trigger('click');
    await flushPromises();
  };

  it('can render', () => {
    expect(wrapper.attributes(testAttr)).toBe(rootName);
    expect(fields.length).toBe(fieldsCount);
    expect(submitButton.exists()).toBe(true);
  });

  it('can validate', async () => {
    // Check with wrong values (expect address)
    await fillForm({
      form: {
        fullName: '',
        email: 'not@',
        phone: '0000',
        address: 'some address',
      },
    });

    const isRightErrorClasses = fields.wrappers.every((f) => {
      return f.element.name !== 'address'
        ? f.classes(errorClass)
        : !f.classes(errorClass);
    });

    expect(isRightErrorClasses).toBe(true);

    // Check with good values
    await fillForm({
      form: {
        fullName: 'John Connor',
        email: 'some@mail.net',
        phone: '+7 999 111-22-33',
        address: 'some address',
      },
    });

    const isRightGoodClasses = fields.wrappers.some(f => f.classes(errorClass));

    expect(isRightGoodClasses).toBe(false);
  });

  it('can submit', (done) => {
    setTimeout(() => {
      expect(submitButton.text()).toBe(formSavedText);

      done();
    }, 1700);
  });
});
