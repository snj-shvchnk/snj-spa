const Tools = {
    
    debounce: (handler, preload) => {
        let timeout;
        return (...args) => {
                clearTimeout(timeout);
                if (args.kill_timers === true) 
                    return;

                timeout = setTimeout(() => {
                    handler.apply(this, args);
                }, preload);
            };
    },

    daysDifference: (date1, date2, abs) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(date1);
        const secondDate = date2 ? new Date(date2) : new Date();
        const delta = (firstDate - secondDate) / oneDay;
        const diffDays = Math.round( abs ? Math.abs(delta) : delta);
        return diffDays;
    },

    mapObject: (items, handler) => {
        // console.log('MapObject', { items, handler })
        return (
            [ ...Object.keys(items) ].map((m) => handler(m, items[m]))
        );
    },

};

export default Tools;