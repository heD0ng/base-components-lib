export class VirtualList {
    constructor(containerSelector, listSelector) {
        this.state = {
            dataSource: [], // 模拟数据源
            itemHeight: 100, // 固定 item 高度
            viewHeight: 0, // container 高度
            maxCount: 0, // 虚拟列表视图最大容纳量
        };
        this.scrollStyle = {}; // list 动态样式（高度，偏移）
        this.startIndex = 0; // 当前视图列表在数据源中的起始索引
        this.endIndex = 0; // 当前视图列表在数据源中的末尾索引
        this.renderList = []; // 渲染在视图上的列表项
        this.oldStartIndex = 0; // 优化列表的滚动
        // 根据用户传入的选择器获取 DOM 并保存
        this.oContainer = document.querySelector(containerSelector);
        this.oList = document.querySelector(listSelector);
    }

    init() {
        this.state.viewHeight = this.oContainer.offsetHeight;
        console.log('======offsetHeight', this.oContainer.offsetHeight);
        this.state.maxCount = Math.ceil(this.state.viewHeight / this.state.itemHeight) + 1;
        this.bindEvent();
        this.addData();
        this.render();
    }
    addData() {
        for (let i = 0; i < 20; i++) {
            this.state.dataSource.push(this.state.dataSource.length + 1);
        }
    }

    computedEndIndex() {
        const end = this.startIndex + this.state.maxCount;
        this.endIndex = this.state.dataSource[end] ? end : this.state.dataSource.length;
    }

    computedRenderList() {
        this.renderList = this.state.dataSource.slice(this.startIndex, this.endIndex);
    }

    computedScrollStyle() {
        const { dataSource, itemHeight } = this.state;
        this.scrollStyle = {
            height: `${dataSource.length * itemHeight - this.startIndex * itemHeight}px`,
            transform: `translate3d(0, ${this.startIndex * itemHeight}px, 0)`,
        };
    }

    render() {
        this.computedEndIndex();
        this.computedRenderList();
        this.computedScrollStyle();
        const template = this.renderList
            .map((i) => `<div class="virtual-list-item">${i}</div>`)
            .join('');
        const { height, transform } = this.scrollStyle;
        this.oList.innerHTML = template;
        this.oList.style.height = height;
        this.oList.style.transform = transform;
    }

    bindEvent() {
        // 注意需要改变 this 指向 -> bind
        this.oContainer.addEventListener('scroll', this.rafThrottle(this.handleScroll.bind(this)));
    }

    handleScroll() {
        const { scrollTop } = this.oContainer;
        this.startIndex = Math.floor(scrollTop / this.state.itemHeight);
        if (this.startIndex !== this.oldStartIndex) {
            this.render();
            this.oldStartIndex = this.startIndex;
        }
    }

    rafThrottle(fn) {
        let lock = false;
        return function (...args) {
            window.requestAnimationFrame(() => {
                if (lock) return;
                lock = true;
                fn.apply(this, args);
                lock = false;
            });
        };
    }
}
