import { shallowMount } from '@vue/test-utils'
import HelloWorld from "@/components/client"
import axios from 'axios';

describe('Client.vue', () => {
  test('renders correctly', () => {
    expect(shallowMount(HelloWorld).element).toMatchSnapshot()
  })
});


describe('client.vue', () => {
  it('should set correct ttc', () => {
    axios.get('http://mspr.califourchon.wtf/mspr-ci/turnovers')
        .then(responses => {
          // JSON responses are automatically parsed.
          this.ht = responses.data.turnoverht
          this.ttc = responses.data.turnoverttc
          expect(ttc).toEqual((ht) * 1.2);
        })
        .catch(e => {
          this.errors.push(e)
        });
  });
});
