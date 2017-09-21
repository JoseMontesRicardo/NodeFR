const timer = (target, name, descriptor) => {
    // create a reference to the function
    let fn = descriptor.value
    // modify!
    descriptor.value = function () {
        console.log(name)
        let result = fn.apply(this, arguments)
    }
}

const router = (target, name, descriptor) => {
    // create a reference to the function
    let fn = descriptor.value
    // modify!
    descriptor.value = function () {
        target.app3 = app;
        fn.apply(this, arguments)
    }
    return descriptor
}


export { timer, router }