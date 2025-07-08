class UICreator {
  createSlider(containerRef, options = {}) {
    const {
      id = '',
      min = 0,
      max = 100,
      step = 1,
      value = min,
      label = '',
      onChange
    } = options;

    if (!id || typeof id !== 'string') {
      throw new Error("A valid id is required for the slider.");
    }

    if (!containerRef || !containerRef.value) {
      throw new Error("Valid container ref is required for the slider.");
    }
    if (!onChange || typeof onChange !== 'function') {
      throw new Error("onChange callback is required and must be a function.");
    }

    const container = containerRef.value;

    // Create slider wrapper
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider-wrapper';

    // Create label if provided
    if (label) {
      const labelElement = document.createElement('label');
      labelElement.textContent = label;
      labelElement.setAttribute('for', id);
      sliderWrapper.appendChild(labelElement);
    }

    // Create slider input
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = id;
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = value;
    slider.className = 'slider';

    // Add event listener
    slider.addEventListener('input', (e) => {
      const newValue = parseFloat(e.target.value);
      onChange(newValue);
    });

    // Append elements
    sliderWrapper.appendChild(slider);
    container.appendChild(sliderWrapper);

    return {
      element: slider,
      wrapper: sliderWrapper,
      setValue: (newValue) => {
        slider.value = newValue;
      },
      getValue: () => parseFloat(slider.value)
    };
  }
}
export default UICreator;