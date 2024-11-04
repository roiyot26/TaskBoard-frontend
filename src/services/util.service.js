export const utilService = {
    debounce,
    getPriorityClass
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  function getPriorityClass(priority) {
    if (priority >= 0 && priority <= 0.4) {
        return 'low'
    } else if (priority > 0.4 && priority <= 0.7) {
        return "medium"
    } else if (priority > 0.7 && priority <= 1) {
        return "high"
    } else {
        throw new Error("Priority must be between 0 and 1");
    }
}