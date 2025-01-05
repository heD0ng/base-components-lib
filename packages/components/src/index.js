import Button from '@/components/Button';
import VirtualList from '@/components/VirtualList';

const components = [Button, VirtualList];

const install = function (Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

export { Button, VirtualList };

export default {
    install,
    Button,
    VirtualList,
};
