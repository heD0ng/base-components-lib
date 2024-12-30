import Button from '@/components/Button';
// import Button from './components/Button';

const components = [Button];

const install = function (Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

export { Button };

export default {
    install,
    Button,
};
