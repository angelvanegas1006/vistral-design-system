'use strict';

var React2 = require('react');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');
var SelectPrimitive = require('@radix-ui/react-select');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var DialogPrimitive = require('@radix-ui/react-dialog');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React2__namespace = /*#__PURE__*/_interopNamespace(React2);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);

// src/components/ui/button.tsx
var BUTTON_TOKENS = {
  // Colors
  primary: {
    bg: "#2050f6",
    bgHover: "#1337e2",
    bgActive: "#162eb7",
    fg: "#ffffff"
  },
  secondary: {
    bg: "#d9e7ff",
    bgHover: "#eef4ff",
    bgActive: "#cfe1ff",
    fg: "#162eb7",
    fgActive: "#182c90"
  },
  outline: {
    bg: "transparent",
    bgHover: "#eef4ff",
    bgActive: "#cfe1ff",
    border: "#2050f6",
    borderHover: "#1337e2",
    borderActive: "#162eb7",
    fg: "#2050f6",
    fgHover: "#1337e2",
    fgActive: "#162eb7"
  },
  ghost: {
    bg: "transparent",
    bgHover: "#eef4ff",
    bgActive: "#cfe1ff",
    fg: "#162eb7",
    fgActive: "#182c90"
  },
  destructive: {
    bg: "#dc2626",
    bgHover: "#b91c1c",
    bgActive: "#991b1b",
    fg: "#ffffff"
  },
  "destructive-outline": {
    bg: "transparent",
    bgHover: "#fee2e2",
    bgActive: "#fecaca",
    border: "#dc2626",
    borderHover: "#b91c1c",
    borderActive: "#991b1b",
    fg: "#dc2626",
    fgHover: "#b91c1c",
    fgActive: "#991b1b"
  },
  "destructive-ghost": {
    bg: "transparent",
    bgHover: "#fee2e2",
    bgActive: "#fecaca",
    fg: "#dc2626",
    fgHover: "#b91c1c",
    fgActive: "#991b1b"
  },
  disabled: {
    bg: "#e5e5e5",
    fg: "#737373",
    border: "#d4d4d8"
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 12, fontSize: 12, iconSize: 16, gap: 6 },
    md: { height: 40, paddingX: 16, fontSize: 14, iconSize: 18, gap: 8 },
    lg: { height: 48, paddingX: 24, fontSize: 16, iconSize: 20, gap: 10 }
  },
  // Radius (pill shape)
  radius: 9999
};
var Button = React2.forwardRef(
  ({
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    iconOnly = false,
    disabled,
    children,
    style,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const [isPressed, setIsPressed] = React2__namespace.useState(false);
    const [isFocused, setIsFocused] = React2__namespace.useState(false);
    const isDisabled = disabled || isLoading;
    const tokens = BUTTON_TOKENS[variant];
    const sizeTokens = BUTTON_TOKENS.sizes[size];
    const getBgColor = () => {
      if (isDisabled) return BUTTON_TOKENS.disabled.bg;
      if (isPressed && "bgActive" in tokens) return tokens.bgActive;
      if (isHovered && "bgHover" in tokens) return tokens.bgHover;
      return tokens.bg;
    };
    const getFgColor = () => {
      if (isDisabled) return BUTTON_TOKENS.disabled.fg;
      if (isPressed && "fgActive" in tokens) return tokens.fgActive;
      if (isHovered && "fgHover" in tokens) return tokens.fgHover;
      return tokens.fg;
    };
    const getBorderColor = () => {
      if (isDisabled && "border" in BUTTON_TOKENS.disabled) return BUTTON_TOKENS.disabled.border;
      if (isPressed && "borderActive" in tokens) return tokens.borderActive;
      if (isHovered && "borderHover" in tokens) return tokens.borderHover;
      if ("border" in tokens) return tokens.border;
      return "transparent";
    };
    const getBorderWidth = () => {
      if ("border" in tokens) return "1px";
      return "none";
    };
    const getFocusRing = () => {
      if (isFocused && !isDisabled) {
        return "0 0 0 3px rgba(32, 80, 246, 0.2)";
      }
      return "none";
    };
    const buttonStyle = {
      // Layout
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: sizeTokens.gap,
      // Size
      height: sizeTokens.height,
      paddingLeft: iconOnly ? 0 : sizeTokens.paddingX,
      paddingRight: iconOnly ? 0 : sizeTokens.paddingX,
      width: iconOnly ? sizeTokens.height : void 0,
      minWidth: iconOnly ? sizeTokens.height : void 0,
      // Typography
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      lineHeight: 1,
      // Colors
      backgroundColor: getBgColor(),
      color: getFgColor(),
      // Border
      border: getBorderWidth(),
      borderColor: getBorderColor(),
      borderRadius: BUTTON_TOKENS.radius,
      // Focus
      outline: "none",
      boxShadow: getFocusRing(),
      // Cursor
      cursor: isDisabled ? "not-allowed" : "pointer",
      // Transition
      transition: "all 150ms ease-in-out",
      // Transform
      transform: isPressed && !isDisabled ? "scale(0.98)" : "scale(1)",
      // Opacity
      opacity: isDisabled ? 0.6 : 1,
      // User select
      userSelect: "none",
      // Custom styles
      ...style
    };
    const handleMouseEnter = (e) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };
    const handleMouseLeave = (e) => {
      setIsHovered(false);
      setIsPressed(false);
      onMouseLeave?.(e);
    };
    const handleMouseDown = (e) => {
      setIsPressed(true);
      onMouseDown?.(e);
    };
    const handleMouseUp = (e) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };
    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        style: buttonStyle,
        disabled: isDisabled,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...props,
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.Loader2,
            {
              size: sizeTokens.iconSize,
              style: { animation: "spin 1s linear infinite" }
            }
          ) : LeftIcon ? /* @__PURE__ */ jsxRuntime.jsx(LeftIcon, { size: sizeTokens.iconSize }) : iconOnly && React2__namespace.isValidElement(children) ? (
            // When iconOnly is true and children is a React element (icon), render it
            React2__namespace.cloneElement(children, {
              size: sizeTokens.iconSize
            })
          ) : null,
          !iconOnly && children,
          !isLoading && RightIcon && !iconOnly && /* @__PURE__ */ jsxRuntime.jsx(RightIcon, { size: sizeTokens.iconSize })
        ]
      }
    );
  }
);
Button.displayName = "Button";
if (typeof document !== "undefined") {
  const styleId = "vistral-button-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}
var TEXT_TOKENS = {
  // Typography variants
  variants: {
    h1: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#18181b"
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#18181b"
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#18181b"
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#18181b"
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#18181b"
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#18181b"
    },
    body: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#18181b"
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#18181b"
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      color: "#71717a"
    },
    small: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: "#71717a"
    }
  },
  // Colors
  colors: {
    default: "#18181b",
    muted: "#71717a",
    subtle: "#a1a1aa",
    error: "#ef4444",
    success: "#16a34a",
    warning: "#f59e0b",
    info: "#2050f6"
  }
};
var Text = React2.forwardRef(
  ({
    variant = "body",
    color,
    as,
    weight,
    size,
    style,
    children,
    ...props
  }, ref) => {
    const variantTokens = TEXT_TOKENS.variants[variant];
    const getElement = () => {
      if (as) return as;
      if (variant.startsWith("h")) return variant;
      if (variant === "body" || variant === "bodyLarge") return "p";
      return "span";
    };
    const Element = getElement();
    const textColor = color ? TEXT_TOKENS.colors[color] : variantTokens.color;
    const textStyle = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: size || variantTokens.fontSize,
      fontWeight: weight || variantTokens.fontWeight,
      lineHeight: variantTokens.lineHeight,
      color: textColor,
      margin: 0,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(Element, { ref, style: textStyle, ...props, children });
  }
);
Text.displayName = "Text";
var INPUT_TOKENS = {
  // States
  default: {
    bg: "#ffffff",
    border: "#d4d4d8",
    // zinc-300
    borderHover: "#a1a1aa",
    // zinc-400
    borderFocus: "#2050f6",
    // spaceblue-600
    fg: "#18181b",
    // zinc-900
    placeholder: "#a1a1aa"
    // zinc-400
  },
  error: {
    bg: "#ffffff",
    border: "#ef4444",
    // red-500
    borderFocus: "#ef4444",
    fg: "#18181b",
    helperText: "#ef4444"
  },
  disabled: {
    bg: "#f4f4f5",
    // zinc-100
    border: "#e4e4e7",
    // zinc-200
    fg: "#a1a1aa",
    // zinc-400
    placeholder: "#a1a1aa"
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    colorError: "#ef4444",
    colorDisabled: "#a1a1aa"
  },
  // Helper text
  helperText: {
    fontSize: 13,
    color: "#71717a",
    colorError: "#ef4444"
  },
  // Character counter
  counter: {
    fontSize: 12,
    color: "#a1a1aa"
  },
  // Suffix
  suffix: {
    fontSize: 14,
    color: "#71717a"
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 10, fontSize: 13, iconSize: 16 },
    md: { height: 40, paddingX: 12, fontSize: 14, iconSize: 18 },
    lg: { height: 48, paddingX: 14, fontSize: 16, iconSize: 20 }
  },
  // Radius
  radius: 8
};
var Input = React2.forwardRef(
  ({
    size = "md",
    error = false,
    errorMessage,
    label,
    helperText,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    fullWidth = false,
    disabled,
    maxLength,
    showCounter = false,
    suffix,
    optional = false,
    id: providedId,
    style,
    value,
    onChange,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React2__namespace.useState(false);
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const [currentValue, setCurrentValue] = React2__namespace.useState(value || "");
    const generatedId = React2.useId();
    const id = providedId || generatedId;
    React2__namespace.useEffect(() => {
      setCurrentValue(value?.toString() || "");
    }, [value]);
    const sizeTokens = INPUT_TOKENS.sizes[size];
    const stateTokens = disabled ? INPUT_TOKENS.disabled : error ? INPUT_TOKENS.error : INPUT_TOKENS.default;
    const getBorderColor = () => {
      if (disabled) return stateTokens.border;
      if (isFocused) return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus;
      if (isHovered) return INPUT_TOKENS.default.borderHover;
      return stateTokens.border;
    };
    const handleChange = (e) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);
      onChange?.(e);
    };
    const characterCount = currentValue.toString().length;
    const showCharacterCounter = showCounter && maxLength !== void 0;
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: fullWidth ? "100%" : void 0
    };
    const labelWrapperStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8
    };
    const labelStyle = {
      fontSize: INPUT_TOKENS.label.fontSize,
      fontWeight: INPUT_TOKENS.label.fontWeight,
      color: disabled ? INPUT_TOKENS.label.colorDisabled : error ? INPUT_TOKENS.label.colorError : INPUT_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const optionalStyle = {
      fontSize: 12,
      fontWeight: 400,
      color: "#a1a1aa",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const inputWrapperStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center"
    };
    const iconPadding = sizeTokens.paddingX + sizeTokens.iconSize + 12;
    const inputStyle = {
      width: "100%",
      height: sizeTokens.height,
      paddingLeft: LeftIcon ? iconPadding : sizeTokens.paddingX,
      paddingRight: RightIcon || showCharacterCounter ? iconPadding : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: stateTokens.fg,
      backgroundColor: stateTokens.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: INPUT_TOKENS.radius,
      outline: "none",
      transition: "border-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
      boxShadow: isFocused && !disabled ? `0 0 0 3px ${error ? "rgba(239, 68, 68, 0.15)" : "rgba(32, 80, 246, 0.15)"}` : "none",
      cursor: disabled ? "not-allowed" : "text",
      boxSizing: "border-box",
      ...style
    };
    const iconStyle = (position) => ({
      position: "absolute",
      [position]: sizeTokens.paddingX,
      top: "50%",
      transform: "translateY(-50%)",
      color: disabled ? "#d4d4d8" : "#71717a",
      pointerEvents: "none",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });
    const counterStyle = {
      position: "absolute",
      right: sizeTokens.paddingX,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: INPUT_TOKENS.counter.fontSize,
      color: INPUT_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      pointerEvents: "none",
      zIndex: 1
    };
    const helperWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8
    };
    const helperStyle = {
      fontSize: INPUT_TOKENS.helperText.fontSize,
      color: error ? INPUT_TOKENS.helperText.colorError : INPUT_TOKENS.helperText.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      flex: 1
    };
    const suffixStyle = {
      fontSize: INPUT_TOKENS.suffix.fontSize,
      color: INPUT_TOKENS.suffix.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
      label && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: labelWrapperStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: id, style: labelStyle, children: label }),
        optional && /* @__PURE__ */ jsxRuntime.jsx("span", { style: optionalStyle, children: "Optional" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          style: inputWrapperStyle,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          children: [
            LeftIcon && /* @__PURE__ */ jsxRuntime.jsx("div", { style: iconStyle("left"), children: /* @__PURE__ */ jsxRuntime.jsx(LeftIcon, { size: sizeTokens.iconSize }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref,
                id,
                disabled,
                maxLength,
                value: currentValue,
                onChange: handleChange,
                style: inputStyle,
                onFocus: (e) => {
                  setIsFocused(true);
                  props.onFocus?.(e);
                },
                onBlur: (e) => {
                  setIsFocused(false);
                  props.onBlur?.(e);
                },
                "aria-invalid": error,
                "aria-describedby": helperText || errorMessage || suffix ? `${id}-helper` : void 0,
                "aria-required": !optional,
                ...props
              }
            ),
            showCharacterCounter && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: counterStyle, children: [
              characterCount,
              "/",
              maxLength
            ] }),
            RightIcon && !showCharacterCounter && /* @__PURE__ */ jsxRuntime.jsx("div", { style: iconStyle("right"), children: /* @__PURE__ */ jsxRuntime.jsx(
              RightIcon,
              {
                size: sizeTokens.iconSize,
                style: {
                  animation: RightIcon === lucideReact.Loader2 ? "spin 1s linear infinite" : void 0
                }
              }
            ) })
          ]
        }
      ),
      (helperText || errorMessage || suffix) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: helperWrapperStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${id}-helper`, style: helperStyle, children: error ? errorMessage : helperText }),
        suffix && /* @__PURE__ */ jsxRuntime.jsx("span", { style: suffixStyle, children: suffix })
      ] })
    ] });
  }
);
Input.displayName = "Input";
var Textarea = React2.forwardRef(
  ({
    error = false,
    errorMessage,
    label,
    helperText,
    fullWidth = false,
    autoResize = false,
    disabled,
    maxLength,
    showCounter = false,
    id: providedId,
    style,
    rows = 3,
    value,
    onChange,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React2__namespace.useState(false);
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const [currentValue, setCurrentValue] = React2__namespace.useState(value || "");
    const textareaRef = React2__namespace.useRef(null);
    const generatedId = React2.useId();
    const id = providedId || generatedId;
    React2__namespace.useEffect(() => {
      setCurrentValue(value?.toString() || "");
    }, [value]);
    React2__namespace.useImperativeHandle(ref, () => textareaRef.current);
    React2__namespace.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [currentValue, autoResize]);
    const stateTokens = disabled ? INPUT_TOKENS.disabled : error ? INPUT_TOKENS.error : INPUT_TOKENS.default;
    const getBorderColor = () => {
      if (disabled) return stateTokens.border;
      if (isFocused) return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus;
      if (isHovered) return INPUT_TOKENS.default.borderHover;
      return stateTokens.border;
    };
    const handleChange = (e) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);
      onChange?.(e);
    };
    const characterCount = currentValue.toString().length;
    const showCharacterCounter = showCounter && maxLength !== void 0;
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: fullWidth ? "100%" : void 0
    };
    const labelStyle = {
      fontSize: INPUT_TOKENS.label.fontSize,
      fontWeight: INPUT_TOKENS.label.fontWeight,
      color: disabled ? INPUT_TOKENS.label.colorDisabled : error ? INPUT_TOKENS.label.colorError : INPUT_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const textareaStyle = {
      width: "100%",
      padding: 12,
      fontSize: 14,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: stateTokens.fg,
      backgroundColor: stateTokens.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: INPUT_TOKENS.radius,
      outline: "none",
      transition: "border-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
      boxShadow: isFocused && !disabled ? `0 0 0 3px ${error ? "rgba(239, 68, 68, 0.15)" : "rgba(32, 80, 246, 0.15)"}` : "none",
      cursor: disabled ? "not-allowed" : "text",
      resize: autoResize ? "none" : "vertical",
      minHeight: autoResize ? "auto" : void 0,
      boxSizing: "border-box",
      lineHeight: 1.5,
      ...style
    };
    const helperWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8
    };
    const helperStyle = {
      fontSize: INPUT_TOKENS.helperText.fontSize,
      color: error ? INPUT_TOKENS.helperText.colorError : INPUT_TOKENS.helperText.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      flex: 1
    };
    const counterStyle = {
      fontSize: INPUT_TOKENS.counter.fontSize,
      color: INPUT_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: id, style: labelStyle, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "textarea",
        {
          ref: textareaRef,
          id,
          disabled,
          maxLength,
          rows,
          value: currentValue,
          onChange: handleChange,
          style: textareaStyle,
          onFocus: (e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          },
          onBlur: (e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          },
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          "aria-invalid": error,
          "aria-describedby": helperText || errorMessage || showCharacterCounter ? `${id}-helper` : void 0,
          ...props
        }
      ),
      (helperText || errorMessage || showCharacterCounter) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: helperWrapperStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${id}-helper`, style: helperStyle, children: error ? errorMessage : helperText }),
        showCharacterCounter && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: counterStyle, children: [
          characterCount,
          "/",
          maxLength,
          " characters"
        ] })
      ] })
    ] });
  }
);
Textarea.displayName = "Textarea";
var BADGE_TOKENS = {
  variants: {
    default: { bg: "#f4f4f5", fg: "#3f3f46" },
    // zinc-100, zinc-700
    primary: { bg: "#dbeafe", fg: "#1d4ed8" },
    // blue-100, blue-700
    brand: { bg: "#eef4ff", fg: "#2050f6" },
    // spaceblue-50, spaceblue-600
    error: { bg: "#fee2e2", fg: "#dc2626" },
    // red-100, red-600
    warning: { bg: "#fef3c7", fg: "#d97706" },
    // amber-100, amber-600
    success: { bg: "#dcfce7", fg: "#16a34a" }
    // green-100, green-600
  },
  // Dot variants (filled circles)
  dotVariants: {
    default: { bg: "#71717a" },
    // zinc-500
    primary: { bg: "#3b82f6" },
    // blue-500
    brand: { bg: "#2050f6" },
    // spaceblue-600
    error: { bg: "#ef4444" },
    // red-500
    warning: { bg: "#f59e0b" },
    // amber-500
    success: { bg: "#22c55e" }
    // green-500
  },
  sizes: {
    sm: { height: 18, fontSize: 10, paddingX: 6, dotSize: 6 },
    md: { height: 22, fontSize: 12, paddingX: 8, dotSize: 8 }
  },
  radius: 6
  // Not fully rounded, just subtle radius
};
var Badge = React2.forwardRef(
  ({ variant = "default", size = "md", style, children, ...props }, ref) => {
    const tokens = BADGE_TOKENS.variants[variant];
    const sizeTokens = BADGE_TOKENS.sizes[size];
    const badgeStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: tokens.bg,
      color: tokens.fg,
      borderRadius: BADGE_TOKENS.radius,
      whiteSpace: "nowrap",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("span", { ref, style: badgeStyle, ...props, children });
  }
);
Badge.displayName = "Badge";
var DotBadge = React2.forwardRef(
  ({
    variant = "error",
    size = "md",
    count,
    maxCount = 99,
    position = "top-right",
    standalone = false,
    style,
    ...props
  }, ref) => {
    const dotTokens = BADGE_TOKENS.dotVariants[variant];
    const sizeTokens = BADGE_TOKENS.sizes[size];
    const hasCount = count !== void 0 && count > 0;
    const displayCount = hasCount ? count > maxCount ? `${maxCount}+` : count.toString() : null;
    const positionStyles = {
      "top-right": { top: 0, right: 0, transform: "translate(50%, -50%)" },
      "top-left": { top: 0, left: 0, transform: "translate(-50%, -50%)" },
      "bottom-right": { bottom: 0, right: 0, transform: "translate(50%, 50%)" },
      "bottom-left": { bottom: 0, left: 0, transform: "translate(-50%, 50%)" }
    };
    const dotStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: hasCount ? sizeTokens.height : sizeTokens.dotSize,
      height: hasCount ? sizeTokens.height : sizeTokens.dotSize,
      padding: hasCount ? `0 ${sizeTokens.paddingX / 2}px` : 0,
      fontSize: sizeTokens.fontSize - 2,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: dotTokens.bg,
      color: "#ffffff",
      borderRadius: BADGE_TOKENS.radius,
      // Positioning
      ...standalone ? {} : {
        position: "absolute",
        ...positionStyles[position]
      },
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("span", { ref, style: dotStyle, ...props, children: displayCount });
  }
);
DotBadge.displayName = "DotBadge";
var BadgeContainer = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const containerStyle = {
      position: "relative",
      display: "inline-flex",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: containerStyle, ...props, children });
  }
);
BadgeContainer.displayName = "BadgeContainer";
var TAG_TOKENS = {
  // Variants
  variants: {
    default: {
      bg: "#f4f4f5",
      fg: "#18181b",
      border: "none"
    },
    outlined: {
      bg: "#ffffff",
      fg: "#18181b",
      border: "#e4e4e7"
    },
    dark: {
      bg: "#18181b",
      fg: "#ffffff",
      border: "none"
    },
    error: {
      bg: "#fee2e2",
      fg: "#dc2626",
      border: "none"
    },
    success: {
      bg: "#dcfce7",
      fg: "#16a34a",
      border: "none"
    },
    info: {
      bg: "#dbeafe",
      fg: "#1d4ed8",
      border: "none"
    }
  },
  // Sizes
  sizes: {
    sm: {
      height: 20,
      paddingX: 8,
      fontSize: 11,
      iconSize: 12,
      gap: 4
    },
    md: {
      height: 24,
      paddingX: 10,
      fontSize: 13,
      iconSize: 14,
      gap: 6
    },
    lg: {
      height: 28,
      paddingX: 12,
      fontSize: 14,
      iconSize: 16,
      gap: 8
    }
  },
  // Close button
  close: {
    size: 14,
    fg: "#71717a",
    fgHover: "#18181b",
    radius: "50%",
    bgHover: "#e4e4e7"
  },
  // Radius
  radius: 6
};
var Tag = React2.forwardRef(
  ({
    variant = "default",
    size = "md",
    icon: Icon2,
    closable = false,
    onClose,
    clickable = false,
    "aria-label": ariaLabel,
    style,
    children,
    onClick,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2.useState(false);
    const tokens = TAG_TOKENS.variants[variant];
    const sizeTokens = TAG_TOKENS.sizes[size];
    const handleClose = (e) => {
      e.stopPropagation();
      onClose?.();
    };
    const tagStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: sizeTokens.gap,
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: closable ? sizeTokens.gap : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: tokens.bg,
      color: tokens.fg,
      border: tokens.border !== "none" ? `1px solid ${tokens.border}` : "none",
      borderRadius: TAG_TOKENS.radius,
      whiteSpace: "nowrap",
      cursor: clickable ? "pointer" : "default",
      transition: "all 150ms ease",
      ...clickable && isHovered && {
        opacity: 0.8
      },
      ...style
    };
    const closeButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: TAG_TOKENS.close.size,
      height: TAG_TOKENS.close.size,
      padding: 0,
      margin: 0,
      border: "none",
      backgroundColor: "transparent",
      borderRadius: TAG_TOKENS.close.radius,
      color: TAG_TOKENS.close.fg,
      cursor: "pointer",
      transition: "all 150ms ease",
      flexShrink: 0
    };
    const finalAriaLabel = ariaLabel || (typeof children === "string" ? `${children} tag${closable ? ", click to remove" : ""}` : void 0);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "span",
      {
        ref,
        role: clickable ? "button" : void 0,
        "aria-label": finalAriaLabel,
        style: tagStyle,
        onClick: clickable ? onClick : void 0,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          Icon2 && /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: sizeTokens.iconSize }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children }),
          closable && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Remove ${typeof children === "string" ? children : "tag"}`,
              style: closeButtonStyle,
              onClick: handleClose,
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = TAG_TOKENS.close.bgHover;
                e.currentTarget.style.color = TAG_TOKENS.close.fgHover;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = TAG_TOKENS.close.fg;
              },
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: sizeTokens.iconSize - 2 })
            }
          )
        ]
      }
    );
  }
);
Tag.displayName = "Tag";
var CHECKBOX_TOKENS = {
  // States
  unchecked: {
    bg: "#ffffff",
    border: "#d4d4d8",
    // zinc-300
    borderHover: "#a1a1aa"
    // zinc-400
  },
  checked: {
    bg: "#2050f6",
    // spaceblue-600
    border: "#2050f6",
    bgHover: "#1337e2",
    // spaceblue-700
    fg: "#ffffff"
  },
  indeterminate: {
    bg: "#2050f6",
    border: "#2050f6",
    bgHover: "#1337e2",
    fg: "#ffffff"
  },
  disabled: {
    bg: "#f4f4f5",
    // zinc-100
    border: "#e4e4e7",
    // zinc-200
    fg: "#a1a1aa"
    // zinc-400
  },
  error: {
    bg: "#ffffff",
    border: "#ef4444"
    // red-500
  },
  // Container hover state
  containerHover: {
    bg: "#fafafa"
  },
  // Sizes
  size: 20,
  radius: 4,
  iconSize: 14,
  // Label
  labelGap: 8,
  // Focus ring
  focusRing: "0 0 0 3px rgba(32, 80, 246, 0.2)"
};
var Checkbox = React2.forwardRef(
  ({
    checked = false,
    indeterminate = false,
    error = false,
    disabled = false,
    label,
    description,
    position = "left",
    showHoverBg = false,
    onCheckedChange,
    onChange,
    onFocus,
    onBlur,
    style,
    className,
    id: providedId,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2.useState(false);
    const [isFocused, setIsFocused] = React2.useState(false);
    const generatedId = React2.useId();
    const id = providedId || generatedId;
    const handleChange = (e) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };
    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const getStateTokens = () => {
      if (disabled) return CHECKBOX_TOKENS.disabled;
      if (checked || indeterminate) {
        const state = indeterminate ? CHECKBOX_TOKENS.indeterminate : CHECKBOX_TOKENS.checked;
        return {
          ...state,
          bg: isHovered && !disabled ? state.bgHover : state.bg
        };
      }
      if (error) return { ...CHECKBOX_TOKENS.unchecked, border: CHECKBOX_TOKENS.error.border };
      return CHECKBOX_TOKENS.unchecked;
    };
    const stateTokens = getStateTokens();
    const containerStyle = {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: CHECKBOX_TOKENS.labelGap,
      flexDirection: position === "right" ? "row-reverse" : "row",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      padding: showHoverBg ? "8px" : "0",
      borderRadius: showHoverBg ? 8 : 0,
      backgroundColor: showHoverBg && isHovered && !disabled ? CHECKBOX_TOKENS.containerHover.bg : "transparent",
      transition: "background-color 150ms ease",
      ...style
    };
    const checkboxWrapperStyle = {
      position: "relative",
      width: CHECKBOX_TOKENS.size,
      height: CHECKBOX_TOKENS.size,
      flexShrink: 0,
      marginTop: description ? 1 : 0
    };
    const visualBoxStyle = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: stateTokens.bg,
      border: `2px solid ${isHovered && !disabled && !checked && !indeterminate ? CHECKBOX_TOKENS.unchecked.borderHover : stateTokens.border}`,
      borderRadius: CHECKBOX_TOKENS.radius,
      transition: "all 150ms ease-in-out",
      pointerEvents: "none",
      boxShadow: isFocused && !disabled ? CHECKBOX_TOKENS.focusRing : "none"
    };
    const inputStyle = {
      position: "absolute",
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: disabled ? "not-allowed" : "pointer"
    };
    const labelContainerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1
    };
    const labelStyle = {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
      color: disabled ? "#a1a1aa" : error ? "#ef4444" : "#18181b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const descriptionStyle = {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: disabled ? "#d4d4d8" : "#71717a",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const IconComponent = indeterminate ? lucideReact.Minus : lucideReact.Check;
    const showIcon = checked || indeterminate;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        style: containerStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        htmlFor: id,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { style: checkboxWrapperStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref,
                type: "checkbox",
                id,
                checked,
                disabled,
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleBlur,
                style: inputStyle,
                "aria-invalid": error,
                "aria-checked": indeterminate ? "mixed" : checked,
                ...props
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("span", { style: visualBoxStyle, children: showIcon && /* @__PURE__ */ jsxRuntime.jsx(
              IconComponent,
              {
                size: CHECKBOX_TOKENS.iconSize,
                color: "fg" in stateTokens ? stateTokens.fg : "#ffffff",
                strokeWidth: 3
              }
            ) })
          ] }),
          (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: labelContainerStyle, children: [
            label && /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label }),
            description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: descriptionStyle, children: description })
          ] })
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";
var CheckboxGroup = React2.forwardRef(
  ({ label, error, orientation = "vertical", style, children, ...props }, ref) => {
    const groupStyle = {
      display: "flex",
      flexDirection: orientation === "horizontal" ? "row" : "column",
      gap: orientation === "horizontal" ? 24 : 12,
      ...style
    };
    const errorStyle = {
      fontSize: 13,
      color: "#ef4444",
      marginTop: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role: "group", ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { marginBottom: 12, fontSize: 14, fontWeight: 600, color: "#18181b" }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: groupStyle, children }),
      error && /* @__PURE__ */ jsxRuntime.jsx("div", { style: errorStyle, children: error })
    ] });
  }
);
CheckboxGroup.displayName = "CheckboxGroup";
var SWITCH_TOKENS = {
  // Track
  track: {
    radius: 9999,
    bgOff: "#e4e4e7",
    // Light gray when OFF
    bgOn: "#2050f6",
    // Blue when ON
    bgDisabledOff: "#f4f4f5",
    // Very light gray disabled OFF
    bgDisabledOn: "#93c5fd"
    // Light blue disabled ON
  },
  // Thumb
  thumb: {
    bg: "#ffffff",
    shadow: "0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)"
  },
  // Sizes per Figma
  sizes: {
    sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbOffset: 2 },
    md: { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbOffset: 2 },
    lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24, thumbOffset: 2 }
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    colorDisabled: "#a1a1aa"
  },
  // Description
  description: {
    fontSize: 13,
    color: "#71717a",
    colorDisabled: "#d4d4d8"
  }
};
var Switch = React2.forwardRef(
  ({
    size = "md",
    checked,
    defaultChecked = false,
    onCheckedChange,
    label,
    description,
    labelPosition = "right",
    disabled,
    id: providedId,
    onChange,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = React2__namespace.useState(defaultChecked);
    const generatedId = React2.useId();
    const id = providedId || generatedId;
    const isControlled = checked !== void 0;
    const isChecked = isControlled ? checked : internalChecked;
    const sizeTokens = SWITCH_TOKENS.sizes[size];
    const handleChange = (e) => {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(e);
      onCheckedChange?.(newChecked);
    };
    const getTrackBg = () => {
      if (disabled) {
        return isChecked ? SWITCH_TOKENS.track.bgDisabledOn : SWITCH_TOKENS.track.bgDisabledOff;
      }
      return isChecked ? SWITCH_TOKENS.track.bgOn : SWITCH_TOKENS.track.bgOff;
    };
    const containerStyle = {
      display: "inline-flex",
      alignItems: "flex-start",
      flexDirection: labelPosition === "left" ? "row-reverse" : "row",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const switchWrapperStyle = {
      position: "relative",
      flexShrink: 0,
      marginTop: 2
      // Align with first line of text
    };
    const trackStyle = {
      display: "block",
      position: "relative",
      width: sizeTokens.trackWidth,
      height: sizeTokens.trackHeight,
      backgroundColor: getTrackBg(),
      borderRadius: SWITCH_TOKENS.track.radius,
      transition: "background-color 200ms ease-in-out",
      cursor: disabled ? "not-allowed" : "pointer"
    };
    const thumbOffset = sizeTokens.thumbOffset;
    const thumbTravel = sizeTokens.trackWidth - sizeTokens.thumbSize - thumbOffset * 2;
    const thumbStyle = {
      position: "absolute",
      top: thumbOffset,
      left: thumbOffset,
      width: sizeTokens.thumbSize,
      height: sizeTokens.thumbSize,
      backgroundColor: SWITCH_TOKENS.thumb.bg,
      borderRadius: "50%",
      boxShadow: SWITCH_TOKENS.thumb.shadow,
      transition: "transform 200ms ease-in-out",
      transform: isChecked ? `translateX(${thumbTravel}px)` : "translateX(0)"
    };
    const inputStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0,
      margin: 0,
      cursor: disabled ? "not-allowed" : "pointer"
    };
    const labelContainerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 2
    };
    const labelStyle = {
      fontSize: SWITCH_TOKENS.label.fontSize,
      fontWeight: SWITCH_TOKENS.label.fontWeight,
      lineHeight: 1.4,
      color: disabled ? SWITCH_TOKENS.label.colorDisabled : SWITCH_TOKENS.label.color
    };
    const descriptionStyle = {
      fontSize: SWITCH_TOKENS.description.fontSize,
      fontWeight: 400,
      lineHeight: 1.4,
      color: disabled ? SWITCH_TOKENS.description.colorDisabled : SWITCH_TOKENS.description.color
    };
    const switchElement = /* @__PURE__ */ jsxRuntime.jsxs("span", { style: switchWrapperStyle, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref,
          type: "checkbox",
          id,
          role: "switch",
          checked: isChecked,
          disabled,
          onChange: handleChange,
          style: inputStyle,
          "aria-checked": isChecked,
          ...props
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: trackStyle, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("span", { style: thumbStyle }) })
    ] });
    const labelElement = label || description ? /* @__PURE__ */ jsxRuntime.jsxs("span", { style: labelContainerStyle, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label }),
      description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: descriptionStyle, children: description })
    ] }) : null;
    return /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: id, style: containerStyle, children: [
      switchElement,
      labelElement
    ] });
  }
);
Switch.displayName = "Switch";
var RADIO_TOKENS = {
  // Outer circle
  outer: {
    size: 20,
    border: "#d4d4d8",
    // zinc-300
    borderHover: "#a1a1aa",
    // zinc-400
    borderChecked: "#2050f6",
    // spaceblue-600
    borderDisabled: "#e4e4e7"
    // zinc-200
  },
  // Inner circle (when checked)
  inner: {
    size: 10,
    bg: "#2050f6",
    // spaceblue-600
    bgDisabled: "#a1a1aa"
    // zinc-400
  },
  // Label
  labelGap: 8
};
var RadioGroupContext = React2.createContext(null);
function useRadioGroup() {
  return React2.useContext(RadioGroupContext);
}
var RadioGroup = React2.forwardRef(
  ({
    name: providedName,
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    disabled = false,
    orientation = "vertical",
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2__namespace.useState(defaultValue);
    const generatedName = React2.useId();
    const name = providedName || generatedName;
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleValueChange = (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    const groupStyle = {
      display: "flex",
      flexDirection: orientation === "horizontal" ? "row" : "column",
      gap: orientation === "horizontal" ? 16 : 12,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(RadioGroupContext.Provider, { value: { name, value, onValueChange: handleValueChange, disabled }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "radiogroup", style: groupStyle, ...props, children }) });
  }
);
RadioGroup.displayName = "RadioGroup";
var Radio = React2.forwardRef(
  ({
    value: radioValue,
    label,
    description,
    disabled: localDisabled,
    id: providedId,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const groupContext = useRadioGroup();
    const generatedId = React2.useId();
    const id = providedId || generatedId;
    const isInGroup = groupContext !== null;
    const name = isInGroup ? groupContext.name : props.name;
    const isChecked = isInGroup ? groupContext.value === radioValue : props.checked;
    const isDisabled = localDisabled ?? (isInGroup ? groupContext.disabled : false);
    const handleChange = (e) => {
      if (isInGroup) {
        groupContext.onValueChange(radioValue);
      }
      props.onChange?.(e);
    };
    const containerStyle = {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: RADIO_TOKENS.labelGap,
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.6 : 1
    };
    const radioWrapperStyle = {
      position: "relative",
      width: RADIO_TOKENS.outer.size,
      height: RADIO_TOKENS.outer.size,
      flexShrink: 0
    };
    const getBorderColor = () => {
      if (isDisabled) return RADIO_TOKENS.outer.borderDisabled;
      if (isChecked) return RADIO_TOKENS.outer.borderChecked;
      if (isHovered) return RADIO_TOKENS.outer.borderHover;
      return RADIO_TOKENS.outer.border;
    };
    const outerStyle = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `2px solid ${getBorderColor()}`,
      borderRadius: "50%",
      transition: "border-color 150ms ease-in-out",
      pointerEvents: "none"
    };
    const innerStyle = {
      width: RADIO_TOKENS.inner.size,
      height: RADIO_TOKENS.inner.size,
      backgroundColor: isDisabled ? RADIO_TOKENS.inner.bgDisabled : RADIO_TOKENS.inner.bg,
      borderRadius: "50%",
      transform: isChecked ? "scale(1)" : "scale(0)",
      transition: "transform 150ms ease-in-out"
    };
    const inputStyle = {
      position: "absolute",
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: isDisabled ? "not-allowed" : "pointer"
    };
    const labelContainerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      paddingTop: 1
    };
    const labelStyle = {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
      color: isDisabled ? "#a1a1aa" : "#18181b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const descriptionStyle = {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: isDisabled ? "#d4d4d8" : "#71717a",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        style: containerStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { style: radioWrapperStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref,
                type: "radio",
                id,
                name,
                value: radioValue,
                checked: isChecked,
                disabled: isDisabled,
                onChange: handleChange,
                style: inputStyle,
                ...props
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("span", { style: outerStyle, children: /* @__PURE__ */ jsxRuntime.jsx("span", { style: innerStyle }) })
          ] }),
          (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: labelContainerStyle, children: [
            label && /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label }),
            description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: descriptionStyle, children: description })
          ] })
        ]
      }
    );
  }
);
Radio.displayName = "Radio";
var SEARCH_INPUT_TOKENS = {
  // Container
  height: {
    sm: 32,
    md: 40,
    lg: 48
  },
  paddingX: 12,
  fontSize: {
    sm: 13,
    md: 14,
    lg: 16
  },
  bg: "#ffffff",
  bgFilled: "#f4f4f5",
  border: "#d4d4d8",
  borderFocus: "#2050f6",
  borderError: "#dc2626",
  radius: 8,
  radiusFull: 9999,
  // Icon
  iconColor: "#71717a",
  iconColorFocus: "#18181b",
  iconSize: {
    sm: 16,
    md: 18,
    lg: 20
  },
  // Clear button
  clearButton: {
    size: 20,
    bg: "#e4e4e7",
    bgHover: "#d4d4d8",
    fg: "#ffffff",
    radius: "50%"
  },
  // Filter button
  filterButton: {
    size: 32,
    bg: "#dbeafe",
    bgHover: "#bfdbfe",
    bgActive: "#93c5fd",
    fg: "#2050f6",
    radius: "50%"
  }
};
var SearchInput = React2.forwardRef(
  ({
    value: controlledValue,
    onChange,
    onSearch,
    placeholder = "Search...",
    size = "md",
    rounded = false,
    clearable = true,
    showFilter = false,
    onFilterClick,
    filterCount,
    filterIcon: FilterIcon,
    filled = false,
    label,
    helperText,
    error = false,
    disabled,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState("");
    const [isFocused, setIsFocused] = React2.useState(false);
    const inputRef = React2.useRef(null);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };
    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onChange?.("");
      inputRef.current?.focus();
    };
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && onSearch) {
        e.preventDefault();
        onSearch(value);
      }
    };
    const height = SEARCH_INPUT_TOKENS.height[size];
    const fontSize = SEARCH_INPUT_TOKENS.fontSize[size];
    const iconSize = SEARCH_INPUT_TOKENS.iconSize[size];
    const wrapperStyle = {
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const containerStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: showFilter ? 8 : 0
    };
    const getBorderColor = () => {
      if (error) return SEARCH_INPUT_TOKENS.borderError;
      if (isFocused) return SEARCH_INPUT_TOKENS.borderFocus;
      return SEARCH_INPUT_TOKENS.border;
    };
    const inputStyle = {
      width: "100%",
      height,
      paddingLeft: height,
      // Space for icon on the left
      paddingRight: (clearable && value ? height : SEARCH_INPUT_TOKENS.paddingX) + (showFilter ? height + 8 : 0),
      // Space for clear button and filter
      paddingTop: 0,
      paddingBottom: 0,
      fontSize,
      fontFamily: "inherit",
      backgroundColor: filled ? SEARCH_INPUT_TOKENS.bgFilled : SEARCH_INPUT_TOKENS.bg,
      border: filled ? "none" : `1px solid ${getBorderColor()}`,
      borderRadius: rounded ? SEARCH_INPUT_TOKENS.radiusFull : SEARCH_INPUT_TOKENS.radius,
      outline: "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      opacity: disabled ? 0.5 : 1,
      boxSizing: "border-box",
      ...isFocused && filled && {
        boxShadow: `0 0 0 2px ${SEARCH_INPUT_TOKENS.borderFocus}`
      }
    };
    const iconContainerStyle = {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isFocused ? SEARCH_INPUT_TOKENS.iconColorFocus : SEARCH_INPUT_TOKENS.iconColor,
      pointerEvents: "none",
      zIndex: 1,
      transition: "color 150ms ease"
    };
    const clearButtonStyle = {
      position: "absolute",
      right: showFilter ? height + 16 : 4,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: SEARCH_INPUT_TOKENS.clearButton.size,
      height: SEARCH_INPUT_TOKENS.clearButton.size,
      padding: 0,
      background: SEARCH_INPUT_TOKENS.clearButton.bg,
      border: "none",
      borderRadius: SEARCH_INPUT_TOKENS.clearButton.radius,
      cursor: "pointer",
      color: SEARCH_INPUT_TOKENS.clearButton.fg,
      transition: "background-color 150ms ease",
      zIndex: 2
    };
    const filterButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: SEARCH_INPUT_TOKENS.filterButton.size,
      height: SEARCH_INPUT_TOKENS.filterButton.size,
      padding: 0,
      background: filterCount ? SEARCH_INPUT_TOKENS.filterButton.bgActive : SEARCH_INPUT_TOKENS.filterButton.bg,
      border: "none",
      borderRadius: SEARCH_INPUT_TOKENS.filterButton.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      color: SEARCH_INPUT_TOKENS.filterButton.fg,
      transition: "background-color 150ms ease",
      flexShrink: 0,
      position: "relative"
    };
    const filterBadgeStyle = {
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#71717a",
      color: "#ffffff",
      borderRadius: 8,
      fontSize: 10,
      fontWeight: 600,
      fontFamily: "inherit"
    };
    const inputId = React2__namespace.useId();
    const helperId = helperText ? `search-helper-${inputId}` : void 0;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: wrapperStyle, role: "search", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        "label",
        {
          htmlFor: inputId,
          style: {
            display: "block",
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 500,
            color: disabled ? "#a1a1aa" : "#18181b"
          },
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { style: iconContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { size: iconSize }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: inputRef || ref,
            id: inputId,
            type: "search",
            value,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            placeholder,
            disabled,
            style: inputStyle,
            "aria-label": "Search",
            "aria-invalid": error,
            "aria-describedby": helperId,
            ...props
          }
        ),
        clearable && value && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: clearButtonStyle,
            onClick: handleClear,
            "aria-label": "Clear search",
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.clearButton.bgHover;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.clearButton.bg;
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 12 })
          }
        ),
        showFilter && /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            style: filterButtonStyle,
            onClick: onFilterClick,
            disabled,
            "aria-label": `Filter search results${filterCount ? `, ${filterCount} filter${filterCount > 1 ? "s" : ""} applied` : ""}`,
            onMouseEnter: (e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.filterButton.bgHover;
              }
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = filterCount ? SEARCH_INPUT_TOKENS.filterButton.bgActive : SEARCH_INPUT_TOKENS.filterButton.bg;
            },
            children: [
              FilterIcon ? /* @__PURE__ */ jsxRuntime.jsx(FilterIcon, { size: 16 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Filter, { size: 16 }),
              filterCount !== void 0 && filterCount > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { style: filterBadgeStyle, children: filterCount })
            ]
          }
        )
      ] }),
      helperText && /* @__PURE__ */ jsxRuntime.jsx(
        "p",
        {
          id: helperId,
          style: {
            margin: "6px 0 0",
            fontSize: 12,
            color: error ? SEARCH_INPUT_TOKENS.borderError : "#71717a",
            fontFamily: "inherit"
          },
          children: helperText
        }
      )
    ] });
  }
);
SearchInput.displayName = "SearchInput";
var NUMBER_INPUT_TOKENS = {
  // Container
  height: 40,
  bg: "#ffffff",
  border: "#d4d4d8",
  borderFocus: "#2050f6",
  borderError: "#dc2626",
  radius: 8,
  // Button
  button: {
    width: 36,
    bg: "#f4f4f5",
    bgHover: "#e4e4e7",
    bgDisabled: "#fafafa",
    fg: "#18181b",
    fgDisabled: "#a1a1aa"
  },
  // Input
  input: {
    fontSize: 14,
    fontWeight: 500
  }
};
var NumberInput = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    disabled = false,
    error = false,
    label,
    helperText,
    hideButtons = false,
    formatValue,
    parseValue,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [isFocused, setIsFocused] = React2.useState(false);
    const [inputValue, setInputValue] = React2.useState("");
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const clamp = (val) => {
      let clamped = val;
      if (min !== void 0) clamped = Math.max(min, clamped);
      if (max !== void 0) clamped = Math.min(max, clamped);
      return clamped;
    };
    const setValue = (newValue) => {
      const clamped = clamp(newValue);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    };
    const increment = () => {
      if (disabled) return;
      setValue(value + step);
    };
    const decrement = () => {
      if (disabled) return;
      setValue(value - step);
    };
    const handleInputChange = (e) => {
      const raw = e.target.value;
      setInputValue(raw);
      const parsed = parseValue ? parseValue(raw) : parseFloat(raw);
      if (!isNaN(parsed)) {
        setValue(parsed);
      }
    };
    const handleBlur = () => {
      setIsFocused(false);
      setInputValue("");
    };
    const handleFocus = () => {
      setIsFocused(true);
      setInputValue(formatValue ? formatValue(value) : value.toString());
    };
    const displayValue = isFocused ? inputValue : formatValue ? formatValue(value) : value.toString();
    const canDecrement = min === void 0 || value > min;
    const canIncrement = max === void 0 || value < max;
    const getBorderColor = () => {
      if (error) return NUMBER_INPUT_TOKENS.borderError;
      if (isFocused) return NUMBER_INPUT_TOKENS.borderFocus;
      return NUMBER_INPUT_TOKENS.border;
    };
    const wrapperStyle = {
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const containerStyle = {
      display: "flex",
      alignItems: "stretch",
      height: NUMBER_INPUT_TOKENS.height,
      backgroundColor: NUMBER_INPUT_TOKENS.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: NUMBER_INPUT_TOKENS.radius,
      overflow: "hidden",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color 150ms ease"
    };
    const buttonStyle = (canClick) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: NUMBER_INPUT_TOKENS.button.width,
      backgroundColor: NUMBER_INPUT_TOKENS.button.bg,
      border: "none",
      cursor: canClick && !disabled ? "pointer" : "not-allowed",
      color: canClick && !disabled ? NUMBER_INPUT_TOKENS.button.fg : NUMBER_INPUT_TOKENS.button.fgDisabled,
      transition: "background-color 150ms ease"
    });
    const inputStyle = {
      flex: 1,
      textAlign: "center",
      border: "none",
      outline: "none",
      fontSize: NUMBER_INPUT_TOKENS.input.fontSize,
      fontWeight: NUMBER_INPUT_TOKENS.input.fontWeight,
      fontFamily: "inherit",
      backgroundColor: "transparent",
      MozAppearance: "textfield"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: wrapperStyle, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: { display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#18181b" }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
        !hideButtons && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: buttonStyle(canDecrement),
            onClick: decrement,
            disabled: disabled || !canDecrement,
            tabIndex: -1,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref,
            type: "text",
            inputMode: "decimal",
            value: displayValue,
            onChange: handleInputChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            style: inputStyle,
            ...props
          }
        ),
        !hideButtons && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: buttonStyle(canIncrement),
            onClick: increment,
            disabled: disabled || !canIncrement,
            tabIndex: -1,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 16 })
          }
        )
      ] }),
      helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "6px 0 0", fontSize: 12, color: error ? "#dc2626" : "#71717a" }, children: helperText })
    ] });
  }
);
NumberInput.displayName = "NumberInput";
var NUMBER_STEPPER_TOKENS = {
  // Container (inline row layout)
  height: 40,
  gap: 16,
  // Stepper control
  control: {
    gap: 8
  },
  // Buttons (filled style - blue when enabled, gray when disabled)
  button: {
    size: 28,
    bgEnabled: "#b3d4fc",
    // Light blue background when enabled
    bgDisabled: "#e0e0e0",
    // Light gray background when disabled
    bgHover: "#9bc4f5",
    // Slightly darker blue on hover
    fgEnabled: "#ffffff",
    // White icon when enabled
    fgDisabled: "#a0a0a0",
    // Gray icon when disabled
    radius: 9999
    // Full circle
  },
  // Input/Value display (editable field)
  input: {
    minWidth: 40,
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    fg: "#18181b",
    bg: "#ffffff",
    border: "#e4e4e7",
    borderFocus: "#2050f6",
    radius: 8,
    padding: "0 8px"
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    colorDisabled: "#a1a1aa",
    colorError: "#dc2626"
  },
  // Error message
  error: {
    fontSize: 12,
    color: "#dc2626"
  },
  // Divider
  divider: {
    width: 1,
    color: "#e4e4e7"
  }
};
var NumberStepper = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 99,
    step = 1,
    disabled = false,
    onChange,
    label,
    helperText,
    error = false,
    errorMessage,
    showDivider = true,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [hoveredButton, setHoveredButton] = React2.useState(null);
    const [inputValue, setInputValue] = React2.useState(String(defaultValue));
    const [isFocused, setIsFocused] = React2.useState(false);
    const inputRef = React2__namespace.useRef(null);
    const generatedId = React2.useId();
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    React2__namespace.useEffect(() => {
      if (isControlled && !isFocused) {
        setInputValue(String(controlledValue));
      }
    }, [controlledValue, isControlled, isFocused]);
    React2__namespace.useEffect(() => {
      if (!isControlled && !isFocused) {
        setInputValue(String(internalValue));
      }
    }, [internalValue, isControlled, isFocused]);
    const canDecrement = value > min && !disabled;
    const canIncrement = value < max && !disabled;
    const updateValue = (newValue) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      if (!isControlled) {
        setInternalValue(clampedValue);
        setInputValue(String(clampedValue));
      }
      onChange?.(clampedValue);
    };
    const handleDecrement = () => {
      if (canDecrement) {
        updateValue(value - step);
      }
    };
    const handleIncrement = () => {
      if (canIncrement) {
        updateValue(value + step);
      }
    };
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (newValue === "") {
        return;
      }
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue)) {
        updateValue(numValue);
      }
    };
    const handleInputBlur = () => {
      setIsFocused(false);
      const numValue = parseInt(inputValue, 10);
      if (isNaN(numValue) || numValue < min || numValue > max) {
        setInputValue(String(value));
      } else {
        updateValue(numValue);
      }
    };
    const handleInputFocus = () => {
      setIsFocused(true);
    };
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (canIncrement) {
          updateValue(value + step);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (canDecrement) {
          updateValue(value - step);
        }
      }
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const rowStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: NUMBER_STEPPER_TOKENS.gap,
      minHeight: NUMBER_STEPPER_TOKENS.height
    };
    const labelStyle = {
      fontSize: NUMBER_STEPPER_TOKENS.label.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.label.fontWeight,
      color: disabled ? NUMBER_STEPPER_TOKENS.label.colorDisabled : error ? NUMBER_STEPPER_TOKENS.label.colorError : NUMBER_STEPPER_TOKENS.label.color,
      margin: 0
    };
    const dividerStyle = {
      flex: 1,
      height: NUMBER_STEPPER_TOKENS.divider.width,
      backgroundColor: NUMBER_STEPPER_TOKENS.divider.color,
      marginLeft: 8,
      marginRight: 8
    };
    const controlStyle = {
      display: "flex",
      alignItems: "center",
      gap: NUMBER_STEPPER_TOKENS.control.gap
    };
    const getButtonStyle = (isEnabled, buttonType) => {
      const isHovered = hoveredButton === buttonType;
      const isActive = isEnabled && !disabled;
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: NUMBER_STEPPER_TOKENS.button.size,
        height: NUMBER_STEPPER_TOKENS.button.size,
        backgroundColor: isActive ? isHovered ? NUMBER_STEPPER_TOKENS.button.bgHover : NUMBER_STEPPER_TOKENS.button.bgEnabled : NUMBER_STEPPER_TOKENS.button.bgDisabled,
        color: isActive ? NUMBER_STEPPER_TOKENS.button.fgEnabled : NUMBER_STEPPER_TOKENS.button.fgDisabled,
        border: "none",
        borderRadius: NUMBER_STEPPER_TOKENS.button.radius,
        cursor: isActive ? "pointer" : "not-allowed",
        transition: "all 150ms ease",
        padding: 0,
        opacity: disabled ? 0.5 : 1
      };
    };
    const inputStyle = {
      width: NUMBER_STEPPER_TOKENS.input.minWidth,
      height: NUMBER_STEPPER_TOKENS.input.height,
      fontSize: NUMBER_STEPPER_TOKENS.input.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.input.fontWeight,
      color: NUMBER_STEPPER_TOKENS.input.fg,
      backgroundColor: disabled ? "#f4f4f5" : NUMBER_STEPPER_TOKENS.input.bg,
      border: `1px solid ${isFocused ? NUMBER_STEPPER_TOKENS.input.borderFocus : NUMBER_STEPPER_TOKENS.input.border}`,
      borderRadius: NUMBER_STEPPER_TOKENS.input.radius,
      padding: NUMBER_STEPPER_TOKENS.input.padding,
      textAlign: "center",
      fontFamily: "inherit",
      outline: "none",
      transition: "border-color 150ms ease",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.5 : 1
    };
    const helperStyle = {
      fontSize: NUMBER_STEPPER_TOKENS.error.fontSize,
      color: error ? NUMBER_STEPPER_TOKENS.error.color : "#71717a",
      margin: 0,
      marginTop: 4
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: rowStyle, children: [
        label && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: generatedId, style: labelStyle, children: label }),
        showDivider && label && /* @__PURE__ */ jsxRuntime.jsx("div", { style: dividerStyle }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: controlStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: handleDecrement,
              disabled: !canDecrement,
              style: getButtonStyle(canDecrement, "dec"),
              onMouseEnter: () => setHoveredButton("dec"),
              onMouseLeave: () => setHoveredButton(null),
              "aria-label": "Decrease value",
              "aria-disabled": !canDecrement,
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref: inputRef,
              id: generatedId,
              type: "text",
              inputMode: "numeric",
              value: inputValue,
              onChange: handleInputChange,
              onBlur: handleInputBlur,
              onFocus: handleInputFocus,
              onKeyDown: handleKeyDown,
              disabled,
              style: inputStyle,
              "aria-valuenow": value,
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-invalid": error,
              "aria-describedby": error && errorMessage ? `${generatedId}-error` : void 0,
              role: "spinbutton"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: handleIncrement,
              disabled: !canIncrement,
              style: getButtonStyle(canIncrement, "inc"),
              onMouseEnter: () => setHoveredButton("inc"),
              onMouseLeave: () => setHoveredButton(null),
              "aria-label": "Increase value",
              "aria-disabled": !canIncrement,
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 16 })
            }
          )
        ] })
      ] }),
      (helperText || errorMessage) && /* @__PURE__ */ jsxRuntime.jsx(
        "p",
        {
          id: error && errorMessage ? `${generatedId}-error` : void 0,
          style: helperStyle,
          role: error ? "alert" : void 0,
          children: error ? errorMessage : helperText
        }
      )
    ] });
  }
);
NumberStepper.displayName = "NumberStepper";
var PHONE_INPUT_TOKENS = {
  // Shared
  height: 44,
  bg: "#ffffff",
  border: "#d4d4d8",
  borderFocus: "#2050f6",
  borderError: "#dc2626",
  radius: 8,
  gap: 0,
  // No gap - seamless connection
  // Country selector
  country: {
    width: 90,
    paddingX: 12,
    fontSize: 14,
    bgHover: "#fafafa"
  },
  // Input
  input: {
    paddingX: 12,
    fontSize: 14
  },
  // Dropdown
  dropdown: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    maxHeight: 240,
    searchPadding: 12,
    optionPadding: "8px 12px"
  }
};
var COUNTRY_CODES = [
  { code: "US", dialCode: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "MX", dialCode: "+52", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico" },
  { code: "CA", dialCode: "+1", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
  { code: "GB", dialCode: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { code: "ES", dialCode: "+34", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
  { code: "FR", dialCode: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "DE", dialCode: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "IT", dialCode: "+39", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy" },
  { code: "BR", dialCode: "+55", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil" },
  { code: "AR", dialCode: "+54", flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina" },
  { code: "CO", dialCode: "+57", flag: "\u{1F1E8}\u{1F1F4}", name: "Colombia" },
  { code: "CL", dialCode: "+56", flag: "\u{1F1E8}\u{1F1F1}", name: "Chile" },
  { code: "PE", dialCode: "+51", flag: "\u{1F1F5}\u{1F1EA}", name: "Peru" },
  { code: "JP", dialCode: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "CN", dialCode: "+86", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "IN", dialCode: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "AU", dialCode: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "IE", dialCode: "+353", flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland" },
  { code: "ID", dialCode: "+62", flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia" },
  { code: "NL", dialCode: "+31", flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
  { code: "BE", dialCode: "+32", flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium" },
  { code: "CH", dialCode: "+41", flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland" },
  { code: "AT", dialCode: "+43", flag: "\u{1F1E6}\u{1F1F9}", name: "Austria" },
  { code: "PT", dialCode: "+351", flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal" },
  { code: "GR", dialCode: "+30", flag: "\u{1F1EC}\u{1F1F7}", name: "Greece" },
  { code: "PL", dialCode: "+48", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland" },
  { code: "RU", dialCode: "+7", flag: "\u{1F1F7}\u{1F1FA}", name: "Russia" },
  { code: "ZA", dialCode: "+27", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa" },
  { code: "NZ", dialCode: "+64", flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand" },
  { code: "KR", dialCode: "+82", flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea" },
  { code: "SG", dialCode: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore" }
];
var formatPhoneNumber = (value, countryCode) => {
  const digits = value.replace(/\D/g, "");
  const patterns = {
    "US": (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`;
    },
    "ES": (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`;
    },
    "AU": (d) => {
      if (d.length <= 4) return d;
      if (d.length <= 8) return `${d.slice(0, 4)} ${d.slice(4)}`;
      return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 10)}`;
    },
    "IE": (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`;
    },
    "ID": (d) => {
      if (d.length <= 4) return d;
      if (d.length <= 8) return `${d.slice(0, 4)} ${d.slice(4)}`;
      return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8, 12)}`;
    }
  };
  const formatter = patterns[countryCode];
  return formatter ? formatter(digits) : digits;
};
var detectCountry = () => {
  if (typeof navigator === "undefined") return "US";
  const locale = navigator.language || navigator.languages?.[0] || "en-US";
  const country = locale.split("-")[1]?.toUpperCase();
  if (country && COUNTRY_CODES.find((c) => c.code === country)) {
    return country;
  }
  return "US";
};
var PhoneInput = React2.forwardRef(
  ({
    value = "",
    countryCode: controlledCountry,
    onChange,
    defaultCountry,
    label,
    helperText,
    error = false,
    disabled = false,
    countries = COUNTRY_CODES,
    autoDetectCountry = true,
    formatOnType = true,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React2.useState(false);
    const [searchQuery, setSearchQuery] = React2.useState("");
    const [internalCountry, setInternalCountry] = React2.useState(() => {
      if (defaultCountry) return defaultCountry;
      if (autoDetectCountry) return detectCountry();
      return "US";
    });
    const [isFocused, setIsFocused] = React2.useState(false);
    const containerRef = React2.useRef(null);
    const searchInputRef = React2.useRef(null);
    const country = controlledCountry || internalCountry;
    const selectedCountry = countries.find((c) => c.code === country) || countries[0];
    const filteredCountries = React2__namespace.useMemo(() => {
      if (!searchQuery) return countries;
      const query = searchQuery.toLowerCase();
      return countries.filter(
        (c) => c.name.toLowerCase().includes(query) || c.dialCode.includes(query) || c.code.toLowerCase().includes(query)
      );
    }, [countries, searchQuery]);
    React2.useEffect(() => {
      if (isOpen && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }, [isOpen]);
    React2.useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const handleCountrySelect = (c) => {
      setInternalCountry(c.code);
      setIsOpen(false);
      setSearchQuery("");
      onChange?.(value, c.code);
    };
    const handleInputChange = (e) => {
      let inputValue = e.target.value;
      const digits = inputValue.replace(/\D/g, "");
      const formatted = formatOnType ? formatPhoneNumber(digits, country) : digits;
      onChange?.(formatted, country);
    };
    const getBorderColor = () => {
      if (error) return PHONE_INPUT_TOKENS.borderError;
      if (isFocused) return PHONE_INPUT_TOKENS.borderFocus;
      return PHONE_INPUT_TOKENS.border;
    };
    const wrapperStyle = {
      width: "100%",
      ...style
    };
    const containerStyle = {
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      gap: PHONE_INPUT_TOKENS.gap,
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const countrySelectorStyle = {
      display: "flex",
      alignItems: "center",
      gap: 6,
      height: PHONE_INPUT_TOKENS.height,
      padding: `0 ${PHONE_INPUT_TOKENS.country.paddingX}px`,
      backgroundColor: PHONE_INPUT_TOKENS.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRight: "none",
      borderTopLeftRadius: PHONE_INPUT_TOKENS.radius,
      borderBottomLeftRadius: PHONE_INPUT_TOKENS.radius,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: PHONE_INPUT_TOKENS.country.fontSize,
      transition: "border-color 150ms ease, background-color 150ms ease",
      boxSizing: "border-box",
      alignSelf: "stretch"
    };
    const inputContainerStyle = {
      flex: 1,
      display: "flex",
      alignItems: "center",
      height: PHONE_INPUT_TOKENS.height,
      backgroundColor: PHONE_INPUT_TOKENS.bg,
      border: `1px solid ${getBorderColor()}`,
      borderLeft: "none",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: PHONE_INPUT_TOKENS.radius,
      borderBottomRightRadius: PHONE_INPUT_TOKENS.radius,
      transition: "border-color 150ms ease",
      boxSizing: "border-box",
      alignSelf: "stretch"
    };
    const inputStyle = {
      flex: 1,
      height: "100%",
      padding: `0 ${PHONE_INPUT_TOKENS.input.paddingX}px`,
      border: "none",
      outline: "none",
      fontSize: PHONE_INPUT_TOKENS.input.fontSize,
      backgroundColor: "transparent",
      fontFamily: "inherit"
    };
    const dropdownStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      minWidth: 280,
      marginTop: 4,
      backgroundColor: PHONE_INPUT_TOKENS.dropdown.bg,
      border: `1px solid ${PHONE_INPUT_TOKENS.dropdown.border}`,
      borderRadius: PHONE_INPUT_TOKENS.dropdown.radius,
      boxShadow: PHONE_INPUT_TOKENS.dropdown.shadow,
      maxHeight: PHONE_INPUT_TOKENS.dropdown.maxHeight,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      zIndex: 9999
    };
    const searchStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: PHONE_INPUT_TOKENS.dropdown.searchPadding,
      borderBottom: `1px solid ${PHONE_INPUT_TOKENS.dropdown.border}`
    };
    const searchInputStyle = {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 14,
      fontFamily: "inherit",
      backgroundColor: "transparent"
    };
    const optionsContainerStyle = {
      overflowY: "auto",
      maxHeight: PHONE_INPUT_TOKENS.dropdown.maxHeight - 60
      // Account for search bar
    };
    const optionStyle = (isSelected, isHovered) => ({
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: PHONE_INPUT_TOKENS.dropdown.optionPadding,
      fontSize: 14,
      cursor: "pointer",
      backgroundColor: isSelected ? "#f4f4f5" : isHovered ? "#fafafa" : "transparent",
      transition: "background-color 150ms ease"
    });
    const [hoveredOption, setHoveredOption] = React2.useState(null);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: wrapperStyle, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        "label",
        {
          htmlFor: `phone-input-${country}`,
          style: {
            display: "block",
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 500,
            color: disabled ? "#a1a1aa" : "#18181b",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, style: containerStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              "aria-label": `Select country code, currently ${selectedCountry.name}`,
              "aria-expanded": isOpen,
              "aria-haspopup": "listbox",
              style: countrySelectorStyle,
              onClick: () => !disabled && setIsOpen(!isOpen),
              disabled,
              onMouseEnter: (e) => {
                if (!disabled && !isOpen) {
                  e.currentTarget.style.backgroundColor = PHONE_INPUT_TOKENS.country.bgHover;
                }
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = PHONE_INPUT_TOKENS.bg;
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 18 }, children: selectedCountry.flag }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#18181b", fontWeight: 500 }, children: selectedCountry.dialCode }),
                isOpen ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { size: 16, style: { color: "#71717a" } }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 16, style: { color: "#71717a" } })
              ]
            }
          ),
          isOpen && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              role: "listbox",
              style: dropdownStyle,
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { style: searchStyle, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { size: 16, style: { color: "#71717a" } }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "input",
                    {
                      ref: searchInputRef,
                      type: "text",
                      placeholder: "Search country",
                      value: searchQuery,
                      onChange: (e) => setSearchQuery(e.target.value),
                      style: searchInputStyle,
                      "aria-label": "Search country"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { style: optionsContainerStyle, children: [
                  filteredCountries.map((c) => {
                    const isSelected = c.code === country;
                    const isHovered = hoveredOption === c.code;
                    return /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        role: "option",
                        "aria-selected": isSelected,
                        style: optionStyle(isSelected, isHovered),
                        onClick: () => handleCountrySelect(c),
                        onMouseEnter: () => setHoveredOption(c.code),
                        onMouseLeave: () => setHoveredOption(null),
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 18 }, children: c.flag }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1, color: "#18181b" }, children: c.name }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#71717a", marginRight: 8 }, children: c.dialCode }),
                          isSelected && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16, style: { color: "#2050f6" } })
                        ]
                      },
                      c.code
                    );
                  }),
                  filteredCountries.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { padding: PHONE_INPUT_TOKENS.dropdown.optionPadding, color: "#71717a", fontSize: 14 }, children: "No countries found" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: inputContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref,
            id: `phone-input-${country}`,
            type: "tel",
            value,
            onChange: handleInputChange,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            disabled,
            style: inputStyle,
            placeholder: `${selectedCountry.dialCode} Phone number`,
            "aria-label": label || "Phone number",
            "aria-invalid": error,
            "aria-describedby": helperText ? `phone-helper-${country}` : void 0,
            ...props
          }
        ) })
      ] }),
      helperText && /* @__PURE__ */ jsxRuntime.jsx(
        "p",
        {
          id: `phone-helper-${country}`,
          style: {
            margin: "6px 0 0",
            fontSize: 12,
            color: error ? "#dc2626" : "#71717a",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          children: helperText
        }
      )
    ] });
  }
);
PhoneInput.displayName = "PhoneInput";
var PIN_CODE_TOKENS = {
  // Cell
  cell: {
    size: 48,
    fontSize: 24,
    fontWeight: 500,
    // Medium weight
    bg: "#ffffff",
    border: "#d4d4d8",
    borderFocus: "#2050f6",
    borderError: "#dc2626",
    borderSuccess: "#16a34a",
    radius: 8
  },
  // Gap
  gap: 8
};
var PinCode = React2.forwardRef(
  ({
    length = 6,
    value = "",
    onChange,
    onComplete,
    mask = false,
    error = false,
    success = false,
    disabled = false,
    autoFocus = true,
    label,
    helperText,
    size = "md",
    style,
    ...props
  }, ref) => {
    const [values, setValues] = React2.useState(Array(length).fill(""));
    const inputRefs = React2.useRef([]);
    const sizeStyles = {
      sm: { size: 40, fontSize: 20 },
      md: { size: 48, fontSize: 24 },
      lg: { size: 56, fontSize: 28 }
    };
    const currentSize = sizeStyles[size];
    React2.useEffect(() => {
      if (value) {
        const chars = value.split("").slice(0, length);
        setValues([...chars, ...Array(length - chars.length).fill("")]);
      }
    }, [value, length]);
    React2.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);
    const getBorderColor = (index, focused) => {
      if (error) return PIN_CODE_TOKENS.cell.borderError;
      if (success) return PIN_CODE_TOKENS.cell.borderSuccess;
      if (focused) return PIN_CODE_TOKENS.cell.borderFocus;
      return PIN_CODE_TOKENS.cell.border;
    };
    const handleChange = (index, char) => {
      if (disabled) return;
      const digit = char.replace(/\D/g, "").slice(-1);
      const newValues = [...values];
      newValues[index] = digit;
      setValues(newValues);
      const newValue = newValues.join("");
      onChange?.(newValue);
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      if (newValues.every((v) => v) && newValues.length === length) {
        onComplete?.(newValue);
      }
    };
    const handleKeyDown = (index, e) => {
      if (disabled) return;
      if (e.key === "Backspace") {
        if (!values[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
        onChange?.(newValues.join(""));
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    const handlePaste = (e) => {
      e.preventDefault();
      if (disabled) return;
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      const chars = pastedData.split("");
      const newValues = [...chars, ...Array(length - chars.length).fill("")];
      setValues(newValues);
      onChange?.(newValues.join(""));
      const lastIndex = Math.min(chars.length, length - 1);
      inputRefs.current[lastIndex]?.focus();
      if (chars.length === length) {
        onComplete?.(pastedData);
      }
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const inputsContainerStyle = {
      display: "flex",
      gap: PIN_CODE_TOKENS.gap
    };
    const getCellStyle = (index, focused) => ({
      width: currentSize.size,
      height: currentSize.size,
      textAlign: "center",
      fontSize: currentSize.fontSize,
      fontWeight: PIN_CODE_TOKENS.cell.fontWeight,
      fontFamily: "inherit",
      backgroundColor: PIN_CODE_TOKENS.cell.bg,
      border: `2px solid ${getBorderColor(index, focused)}`,
      borderRadius: PIN_CODE_TOKENS.cell.radius,
      outline: "none",
      transition: "border-color 150ms ease",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text"
    });
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: {
        fontSize: 14,
        fontWeight: 500,
        color: "#18181b"
      }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: inputsContainerStyle, children: Array.from({ length }).map((_, index) => /* @__PURE__ */ jsxRuntime.jsx(
        PinCell,
        {
          ref: (el) => {
            inputRefs.current[index] = el;
          },
          value: values[index],
          mask,
          disabled,
          style: getCellStyle,
          index,
          onChange: (char) => handleChange(index, char),
          onKeyDown: (e) => handleKeyDown(index, e),
          onPaste: index === 0 ? handlePaste : void 0
        },
        index
      )) }),
      helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { style: {
        margin: 0,
        fontSize: 12,
        color: error ? "#dc2626" : success ? "#16a34a" : "#71717a"
      }, children: helperText })
    ] });
  }
);
PinCode.displayName = "PinCode";
var PinCell = React2.forwardRef(
  ({ value, mask, disabled, style, index, onChange, onKeyDown, onPaste }, ref) => {
    const [isFocused, setIsFocused] = React2.useState(false);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        type: mask ? "password" : "text",
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 1,
        value,
        disabled,
        style: style(index, isFocused),
        onChange: (e) => onChange(e.target.value),
        onKeyDown,
        onPaste,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        autoComplete: "one-time-code"
      }
    );
  }
);
PinCell.displayName = "PinCell";
var TAG_INPUT_TOKENS = {
  // Container
  container: {
    minHeight: 40,
    paddingX: 8,
    paddingY: 6,
    bg: "#ffffff",
    border: "#d4d4d8",
    borderFocus: "#2050f6",
    borderError: "#dc2626",
    radius: 8
  },
  // Tag
  tag: {
    height: 26,
    paddingX: 8,
    fontSize: 13,
    bg: "#f4f4f5",
    bgHover: "#e4e4e7",
    fg: "#18181b",
    radius: 4
  },
  // Input
  input: {
    fontSize: 14,
    placeholder: "#a1a1aa"
  },
  gap: 6
};
var TagInput = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = [],
    onChange,
    placeholder = "Add tag...",
    maxTags,
    allowDuplicates = false,
    disabled = false,
    error = false,
    label,
    helperText,
    separators = ["Enter", ","],
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [inputValue, setInputValue] = React2.useState("");
    const [isFocused, setIsFocused] = React2.useState(false);
    const inputRef = React2.useRef(null);
    const isControlled = controlledValue !== void 0;
    const tags = isControlled ? controlledValue : internalValue;
    const addTag = (tag) => {
      const trimmed = tag.trim();
      if (!trimmed) return;
      if (!allowDuplicates && tags.includes(trimmed)) return;
      if (maxTags && tags.length >= maxTags) return;
      const newTags = [...tags, trimmed];
      if (!isControlled) {
        setInternalValue(newTags);
      }
      onChange?.(newTags);
      setInputValue("");
    };
    const removeTag = (index) => {
      if (disabled) return;
      const newTags = tags.filter((_, i) => i !== index);
      if (!isControlled) {
        setInternalValue(newTags);
      }
      onChange?.(newTags);
    };
    const handleKeyDown = (e) => {
      if (separators.includes(e.key)) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };
    const handlePaste = (e) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const pastedTags = pastedText.split(/[,\n]/).map((t) => t.trim()).filter(Boolean);
      let newTags = [...tags];
      for (const tag of pastedTags) {
        if (maxTags && newTags.length >= maxTags) break;
        if (!allowDuplicates && newTags.includes(tag)) continue;
        newTags.push(tag);
      }
      if (!isControlled) {
        setInternalValue(newTags);
      }
      onChange?.(newTags);
    };
    const getBorderColor = () => {
      if (error) return TAG_INPUT_TOKENS.container.borderError;
      if (isFocused) return TAG_INPUT_TOKENS.container.borderFocus;
      return TAG_INPUT_TOKENS.container.border;
    };
    const wrapperStyle = {
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const containerStyle = {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: TAG_INPUT_TOKENS.gap,
      minHeight: TAG_INPUT_TOKENS.container.minHeight,
      padding: `${TAG_INPUT_TOKENS.container.paddingY}px ${TAG_INPUT_TOKENS.container.paddingX}px`,
      backgroundColor: TAG_INPUT_TOKENS.container.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: TAG_INPUT_TOKENS.container.radius,
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color 150ms ease"
    };
    const tagStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: TAG_INPUT_TOKENS.tag.height,
      padding: `0 ${TAG_INPUT_TOKENS.tag.paddingX}px`,
      fontSize: TAG_INPUT_TOKENS.tag.fontSize,
      backgroundColor: TAG_INPUT_TOKENS.tag.bg,
      color: TAG_INPUT_TOKENS.tag.fg,
      borderRadius: TAG_INPUT_TOKENS.tag.radius
    };
    const removeButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#71717a",
      marginLeft: 2
    };
    const inputStyle = {
      flex: 1,
      minWidth: 80,
      border: "none",
      outline: "none",
      fontSize: TAG_INPUT_TOKENS.input.fontSize,
      backgroundColor: "transparent",
      fontFamily: "inherit"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: wrapperStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: { display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#18181b" }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          style: containerStyle,
          onClick: () => !disabled && inputRef.current?.focus(),
          children: [
            tags.map((tag, index) => /* @__PURE__ */ jsxRuntime.jsxs("span", { style: tagStyle, children: [
              tag,
              !disabled && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: removeButtonStyle,
                  onClick: (e) => {
                    e.stopPropagation();
                    removeTag(index);
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 14 })
                }
              )
            ] }, `${tag}-${index}`)),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                onKeyDown: handleKeyDown,
                onPaste: handlePaste,
                onFocus: () => setIsFocused(true),
                onBlur: () => {
                  setIsFocused(false);
                  if (inputValue) addTag(inputValue);
                },
                placeholder: tags.length === 0 ? placeholder : "",
                disabled: disabled || maxTags !== void 0 && tags.length >= maxTags,
                style: inputStyle
              }
            )
          ]
        }
      ),
      helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "6px 0 0", fontSize: 12, color: error ? "#dc2626" : "#71717a" }, children: helperText })
    ] });
  }
);
TagInput.displayName = "TagInput";
var FILE_UPLOAD_TOKENS = {
  // Dropzone
  dropzone: {
    padding: 32,
    border: "#d4d4d8",
    borderActive: "#2050f6",
    borderError: "#dc2626",
    bg: "#fafafa",
    bgActive: "#eef4ff",
    radius: 12
  },
  // File item
  file: {
    padding: 12,
    bg: "#ffffff",
    border: "#e4e4e7",
    radius: 8
  },
  // Progress
  progress: {
    height: 4,
    bg: "#e4e4e7",
    fill: "#2050f6",
    radius: 2
  }
};
var FileUpload = React2.forwardRef(
  ({
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    onChange,
    onUpload,
    disabled = false,
    label,
    helperText,
    error,
    style,
    ...props
  }, ref) => {
    const [files, setFiles] = React2.useState([]);
    const [isDragActive, setIsDragActive] = React2.useState(false);
    const inputRef = React2.useRef(null);
    const handleFiles = async (newFiles) => {
      if (!newFiles || disabled) return;
      const fileArray = Array.from(newFiles);
      const validFiles = fileArray.filter((file) => {
        if (maxSize && file.size > maxSize) return false;
        return true;
      });
      if (maxFiles && files.length + validFiles.length > maxFiles) {
        return;
      }
      const uploadFiles = validFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        status: "pending",
        progress: 0
      }));
      setFiles((prev) => multiple ? [...prev, ...uploadFiles] : uploadFiles);
      onChange?.(validFiles);
      if (onUpload) {
        for (const uploadFile of uploadFiles) {
          try {
            setFiles((prev) => prev.map(
              (f) => f.id === uploadFile.id ? { ...f, status: "uploading" } : f
            ));
            for (let i = 0; i <= 100; i += 10) {
              await new Promise((r) => setTimeout(r, 100));
              setFiles((prev) => prev.map(
                (f) => f.id === uploadFile.id ? { ...f, progress: i } : f
              ));
            }
            await onUpload(uploadFile.file);
            setFiles((prev) => prev.map(
              (f) => f.id === uploadFile.id ? { ...f, status: "success", progress: 100 } : f
            ));
          } catch (err) {
            setFiles((prev) => prev.map(
              (f) => f.id === uploadFile.id ? { ...f, status: "error", error: "Upload failed" } : f
            ));
          }
        }
      }
    };
    const removeFile = (id) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    };
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragActive(true);
    };
    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      handleFiles(e.dataTransfer.files);
    };
    const getFileIcon = (file) => {
      const type = file.type.split("/")[0];
      switch (type) {
        case "image":
          return lucideReact.Image;
        case "video":
          return lucideReact.Film;
        case "audio":
          return lucideReact.Music;
        default:
          return file.type.includes("pdf") ? lucideReact.FileText : lucideReact.File;
      }
    };
    const formatFileSize = (bytes) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    const containerStyle = {
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const getBorderColor = () => {
      if (error) return FILE_UPLOAD_TOKENS.dropzone.borderError;
      if (isDragActive) return FILE_UPLOAD_TOKENS.dropzone.borderActive;
      return FILE_UPLOAD_TOKENS.dropzone.border;
    };
    const dropzoneStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: FILE_UPLOAD_TOKENS.dropzone.padding,
      border: `2px dashed ${getBorderColor()}`,
      borderRadius: FILE_UPLOAD_TOKENS.dropzone.radius,
      backgroundColor: isDragActive ? FILE_UPLOAD_TOKENS.dropzone.bgActive : FILE_UPLOAD_TOKENS.dropzone.bg,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "all 150ms ease"
    };
    const fileListStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 16
    };
    const fileItemStyle = {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: FILE_UPLOAD_TOKENS.file.padding,
      backgroundColor: FILE_UPLOAD_TOKENS.file.bg,
      border: `1px solid ${FILE_UPLOAD_TOKENS.file.border}`,
      borderRadius: FILE_UPLOAD_TOKENS.file.radius
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: { display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500, color: "#18181b" }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          style: dropzoneStyle,
          onDragEnter: handleDragIn,
          onDragLeave: handleDragOut,
          onDragOver: handleDrag,
          onDrop: handleDrop,
          onClick: () => !disabled && inputRef.current?.click(),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: inputRef,
                type: "file",
                accept,
                multiple,
                onChange: (e) => handleFiles(e.target.files),
                style: { display: "none" },
                disabled
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: 32, style: { color: "#71717a", marginBottom: 12 } }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "0 0 4px", fontSize: 14, fontWeight: 500, color: "#18181b" }, children: isDragActive ? "Drop files here" : "Click to upload or drag and drop" }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { margin: 0, fontSize: 12, color: "#71717a" }, children: [
              accept ? `Accepted: ${accept}` : "Any file type",
              maxSize && ` \u2022 Max ${formatFileSize(maxSize)}`
            ] })
          ]
        }
      ),
      helperText && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "8px 0 0", fontSize: 12, color: "#71717a" }, children: helperText }),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "8px 0 0", fontSize: 12, color: "#dc2626" }, children: error }),
      files.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: fileListStyle, children: files.map((uploadFile) => {
        const FileIcon = getFileIcon(uploadFile.file);
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: fileItemStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileIcon, { size: 20, style: { color: "#71717a", flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: 0, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: uploadFile.file.name }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { style: { margin: "2px 0 0", fontSize: 11, color: "#71717a" }, children: formatFileSize(uploadFile.file.size) }),
            uploadFile.status === "uploading" && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { marginTop: 6, height: FILE_UPLOAD_TOKENS.progress.height, backgroundColor: FILE_UPLOAD_TOKENS.progress.bg, borderRadius: FILE_UPLOAD_TOKENS.progress.radius }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              height: "100%",
              width: `${uploadFile.progress}%`,
              backgroundColor: FILE_UPLOAD_TOKENS.progress.fill,
              borderRadius: FILE_UPLOAD_TOKENS.progress.radius,
              transition: "width 100ms ease"
            } }) })
          ] }),
          uploadFile.status === "success" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle, { size: 16, style: { color: "#16a34a" } }),
          uploadFile.status === "error" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, { size: 16, style: { color: "#dc2626" } }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeFile(uploadFile.id),
              style: { padding: 4, background: "none", border: "none", cursor: "pointer", color: "#71717a" },
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 })
            }
          )
        ] }, uploadFile.id);
      }) })
    ] });
  }
);
FileUpload.displayName = "FileUpload";
var UPLOADER_TOKENS = {
  // Dropzone
  dropzone: {
    padding: 32,
    border: "#d4d4d8",
    borderDashed: "dashed",
    borderWidth: 2,
    borderActive: "#2050f6",
    borderError: "#dc2626",
    bg: "#fafafa",
    bgActive: "rgba(32, 80, 246, 0.04)",
    bgHover: "#ffffff",
    radius: 12,
    minWidth: 320,
    maxWidth: 600
  },
  // Button variant
  button: {
    padding: "10px 16px",
    border: "#d4d4d8",
    borderError: "#dc2626",
    bg: "#ffffff",
    bgHover: "#fafafa",
    radius: 8,
    gap: 8
  },
  // Text
  text: {
    primary: "#18181b",
    secondary: "#71717a",
    link: "#2050f6",
    linkHover: "#1d4ed8",
    error: "#dc2626"
  },
  // File item
  fileItem: {
    padding: 12,
    bg: "#ffffff",
    border: "#e4e4e7",
    radius: 8,
    gap: 12,
    shadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
  },
  // Thumbnail
  thumbnail: {
    size: 40,
    radius: 6,
    bg: "#f4f4f5"
  },
  // Icon
  icon: {
    size: 32,
    color: "#a1a1aa",
    colorActive: "#2050f6"
  },
  // Close button
  closeButton: {
    size: 28,
    color: "#2050f6",
    // Blue X per Figma
    bg: "#f4f4f5"
  }
};
var Uploader = React2.forwardRef(
  ({
    variant = "dropzone",
    accept,
    multiple = true,
    maxSize = 5 * 1024 * 1024,
    // 5MB default per Figma
    maxFiles = 10,
    onChange,
    onRemove,
    onProgress,
    label,
    helperText,
    error,
    showPreviews = true,
    disabled = false,
    buttonText = "Upload a file",
    displayMode = "list",
    simulateProgress = false,
    style,
    ...props
  }, ref) => {
    const [files, setFiles] = React2.useState([]);
    const [isDragActive, setIsDragActive] = React2.useState(false);
    const [isHovered, setIsHovered] = React2.useState(false);
    const [currentError, setCurrentError] = React2.useState(error || null);
    const inputRef = React2.useRef(null);
    const progressTimersRef = React2.useRef(/* @__PURE__ */ new Map());
    React2.useEffect(() => {
      if (!simulateProgress) return;
      files.forEach((uploadedFile) => {
        if (uploadedFile.progress === void 0 || uploadedFile.progress >= 100) return;
        const timer = setInterval(() => {
          setFiles(
            (prev) => prev.map((f) => {
              if (f.id === uploadedFile.id && f.progress !== void 0 && f.progress < 100) {
                const newProgress = Math.min(f.progress + 10, 100);
                onProgress?.(f.id, newProgress);
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 300);
        progressTimersRef.current.set(uploadedFile.id, timer);
        return () => {
          const timer2 = progressTimersRef.current.get(uploadedFile.id);
          if (timer2) {
            clearInterval(timer2);
            progressTimersRef.current.delete(uploadedFile.id);
          }
        };
      });
    }, [files, simulateProgress, onProgress]);
    const validateFile = (file) => {
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const matchesType = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension === type.toLowerCase();
          }
          if (type.includes("/*")) {
            const baseType = type.split("/")[0];
            return file.type.startsWith(baseType + "/");
          }
          return file.type === type;
        });
        if (!matchesType) {
          return "invalid-format";
        }
      }
      if (file.size > maxSize) {
        return "size-limit";
      }
      if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) {
        return "duplicate";
      }
      return null;
    };
    const getErrorMessage = (errorType, file) => {
      switch (errorType) {
        case "invalid-format":
          return accept ? `This file format is not supported. Please upload files in ${accept}.` : "This file format is not supported.";
        case "size-limit":
          return `File size exceeds size limit of ${formatFileSize(maxSize)}. Reduce file size or choose another document.`;
        case "quantity-limit":
          return `You can only upload a maximum of ${maxFiles} documents. Remove one before adding another.`;
        case "duplicate":
          return "This document is already in the upload list.";
        case "network-failure":
          return "The upload could not be completed due to a network issue.";
        case "required":
          return "You must upload at least one document to continue with the process.";
        default:
          return "An error occurred while uploading the file.";
      }
    };
    const handleFiles = React2.useCallback(
      (newFiles) => {
        if (!newFiles || disabled) return;
        setCurrentError(null);
        const validFiles = [];
        const errors = [];
        const currentCount = files.length;
        Array.from(newFiles).forEach((file, index) => {
          if (currentCount + validFiles.length >= maxFiles) {
            errors.push(getErrorMessage("quantity-limit"));
            return;
          }
          const validationError = validateFile(file);
          if (validationError) {
            errors.push(getErrorMessage(validationError));
            return;
          }
          const uploadedFile = {
            id: `${Date.now()}-${index}`,
            file,
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : void 0,
            progress: simulateProgress ? 0 : void 0
          };
          validFiles.push(uploadedFile);
        });
        if (errors.length > 0) {
          setCurrentError(errors[0]);
        }
        if (validFiles.length > 0) {
          const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
          setFiles(updatedFiles);
          onChange?.(updatedFiles.map((f) => f.file));
        }
      },
      [files, maxFiles, maxSize, multiple, disabled, onChange, accept, simulateProgress]
    );
    const handleDrop = React2.useCallback(
      (e) => {
        e.preventDefault();
        setIsDragActive(false);
        handleFiles(e.dataTransfer.files);
      },
      [handleFiles]
    );
    const handleDragOver = React2.useCallback(
      (e) => {
        e.preventDefault();
        if (!disabled) {
          setIsDragActive(true);
        }
      },
      [disabled]
    );
    const handleDragLeave = React2.useCallback((e) => {
      e.preventDefault();
      setIsDragActive(false);
    }, []);
    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };
    const handleInputChange = (e) => {
      handleFiles(e.target.files);
      e.target.value = "";
    };
    const removeFile = (fileId) => {
      const fileToRemove = files.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      const timer = progressTimersRef.current.get(fileId);
      if (timer) {
        clearInterval(timer);
        progressTimersRef.current.delete(fileId);
      }
      const updatedFiles = files.filter((f) => f.id !== fileId);
      setFiles(updatedFiles);
      if (fileToRemove) {
        onRemove?.(fileToRemove.file);
      }
      onChange?.(updatedFiles.map((f) => f.file));
    };
    const formatFileSize = (bytes) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    const getFileIcon = (file) => {
      if (file.type.startsWith("image/")) return lucideReact.Image;
      if (file.type.startsWith("video/")) return lucideReact.Film;
      if (file.type.startsWith("audio/")) return lucideReact.Music;
      if (file.type.includes("pdf") || file.type.includes("document")) return lucideReact.FileText;
      return lucideReact.File;
    };
    const hasError = currentError || error;
    const errorMessage = currentError || error;
    const containerStyle = {
      width: "100%",
      maxWidth: variant === "dropzone" ? UPLOADER_TOKENS.dropzone.maxWidth : "100%",
      minWidth: variant === "dropzone" ? UPLOADER_TOKENS.dropzone.minWidth : void 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const labelStyle = {
      display: "block",
      marginBottom: 8,
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? UPLOADER_TOKENS.text.secondary : hasError ? UPLOADER_TOKENS.text.error : UPLOADER_TOKENS.text.primary
    };
    const dropzoneStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: UPLOADER_TOKENS.dropzone.padding,
      backgroundColor: isDragActive ? UPLOADER_TOKENS.dropzone.bgActive : isHovered ? UPLOADER_TOKENS.dropzone.bgHover : UPLOADER_TOKENS.dropzone.bg,
      border: `${UPLOADER_TOKENS.dropzone.borderWidth}px ${UPLOADER_TOKENS.dropzone.borderDashed} ${hasError ? UPLOADER_TOKENS.dropzone.borderError : isDragActive ? UPLOADER_TOKENS.dropzone.borderActive : UPLOADER_TOKENS.dropzone.border}`,
      borderRadius: UPLOADER_TOKENS.dropzone.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 200ms ease",
      opacity: disabled ? 0.5 : 1
    };
    const iconStyle = {
      marginBottom: 12,
      color: isDragActive ? UPLOADER_TOKENS.icon.colorActive : UPLOADER_TOKENS.icon.color
    };
    const buttonStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: UPLOADER_TOKENS.button.gap,
      padding: UPLOADER_TOKENS.button.padding,
      backgroundColor: UPLOADER_TOKENS.button.bg,
      color: UPLOADER_TOKENS.text.primary,
      border: `1px solid ${hasError ? UPLOADER_TOKENS.button.borderError : UPLOADER_TOKENS.button.border}`,
      borderRadius: UPLOADER_TOKENS.button.radius,
      fontSize: 14,
      fontWeight: 500,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 150ms ease",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const errorStyle = {
      marginTop: 8,
      fontSize: 13,
      color: UPLOADER_TOKENS.text.error,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const helperStyle = {
      marginTop: 8,
      fontSize: 13,
      color: UPLOADER_TOKENS.text.secondary,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const renderDropzone = () => {
      const fileSizeText = maxSize ? formatFileSize(maxSize) : "5MB";
      const fileCountText = maxFiles ? `max ${maxFiles} files` : "";
      const constraintsText = fileCountText ? `(${fileCountText}, up to ${fileSizeText} each)` : `(up to ${fileSizeText} each)`;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          style: dropzoneStyle,
          onClick: handleClick,
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          role: "button",
          tabIndex: disabled ? -1 : 0,
          "aria-label": "Upload files",
          "aria-describedby": helperText ? "uploader-helper" : void 0,
          onKeyDown: (e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              handleClick();
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: UPLOADER_TOKENS.icon.size, style: iconStyle }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                style: {
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  color: UPLOADER_TOKENS.text.primary,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                },
                children: "Drag & drop files here"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "p",
              {
                style: {
                  margin: "4px 0 0",
                  fontSize: 13,
                  color: UPLOADER_TOKENS.text.secondary,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                },
                children: [
                  "Or",
                  " ",
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "span",
                    {
                      style: {
                        color: isDragActive || isHovered ? UPLOADER_TOKENS.text.linkHover : UPLOADER_TOKENS.text.link,
                        fontWeight: 500,
                        textDecoration: "underline",
                        cursor: "pointer"
                      },
                      children: "click to browse"
                    }
                  ),
                  " ",
                  constraintsText
                ]
              }
            )
          ]
        }
      );
    };
    const renderButton = () => {
      const fileTypesText = accept ? accept.split(",").map((t) => t.trim().replace(/^\./, "").toUpperCase()).join(", ") : "PDF, JPG or PNG";
      const fileSizeText = maxSize ? formatFileSize(maxSize) : "5MB";
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          style: buttonStyle,
          onClick: handleClick,
          disabled,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          "aria-label": buttonText,
          "aria-describedby": helperText ? "uploader-helper" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: 18 }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }, children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: buttonText }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  style: {
                    fontSize: 12,
                    fontWeight: 400,
                    color: UPLOADER_TOKENS.text.secondary
                  },
                  children: [
                    fileTypesText,
                    " less than ",
                    fileSizeText
                  ]
                }
              )
            ] })
          ]
        }
      );
    };
    const fileListStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 16
    };
    const fileItemStyle = {
      display: "flex",
      alignItems: "center",
      gap: UPLOADER_TOKENS.fileItem.gap,
      padding: UPLOADER_TOKENS.fileItem.padding,
      backgroundColor: UPLOADER_TOKENS.fileItem.bg,
      border: `1px solid ${UPLOADER_TOKENS.fileItem.border}`,
      borderRadius: UPLOADER_TOKENS.fileItem.radius,
      boxShadow: UPLOADER_TOKENS.fileItem.shadow
    };
    const thumbnailStyle = {
      width: UPLOADER_TOKENS.thumbnail.size,
      height: UPLOADER_TOKENS.thumbnail.size,
      borderRadius: UPLOADER_TOKENS.thumbnail.radius,
      backgroundColor: UPLOADER_TOKENS.thumbnail.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0
    };
    const removeButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: UPLOADER_TOKENS.closeButton.size,
      height: UPLOADER_TOKENS.closeButton.size,
      padding: 0,
      backgroundColor: UPLOADER_TOKENS.closeButton.bg,
      border: "none",
      borderRadius: "50%",
      color: UPLOADER_TOKENS.closeButton.color,
      cursor: "pointer",
      transition: "all 150ms ease",
      flexShrink: 0
    };
    const renderFileList = () => {
      if (!showPreviews || files.length === 0) return null;
      return /* @__PURE__ */ jsxRuntime.jsx("div", { style: fileListStyle, children: files.map((uploadedFile) => {
        const FileIcon = getFileIcon(uploadedFile.file);
        const isUploading = uploadedFile.progress !== void 0 && uploadedFile.progress < 100;
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: fileItemStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: thumbnailStyle, children: [
            uploadedFile.preview ? /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: uploadedFile.preview,
                alt: uploadedFile.file.name,
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(FileIcon, { size: 20, color: "#71717a" }),
            isUploading && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  padding: 4
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.Loader2,
                  {
                    size: 16,
                    color: "#71717a",
                    style: {
                      animation: "spin 1s linear infinite"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                style: {
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  color: UPLOADER_TOKENS.text.primary,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                },
                children: uploadedFile.file.name
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                style: {
                  margin: "2px 0 0",
                  fontSize: 12,
                  color: UPLOADER_TOKENS.text.secondary,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                },
                children: isUploading && uploadedFile.progress !== void 0 ? `${uploadedFile.progress}%` : formatFileSize(uploadedFile.file.size)
              }
            )
          ] }),
          isUploading && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.Loader2,
            {
              size: 16,
              color: "#71717a",
              style: {
                animation: "spin 1s linear infinite"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              style: removeButtonStyle,
              onClick: (e) => {
                e.stopPropagation();
                removeFile(uploadedFile.id);
              },
              "aria-label": `Remove ${uploadedFile.file.name}`,
              onMouseEnter: (e) => {
                e.currentTarget.style.opacity = "0.8";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.opacity = "1";
              },
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 14 })
            }
          )
        ] }, uploadedFile.id);
      }) });
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: labelStyle, children: label }),
      variant === "dropzone" && renderDropzone(),
      variant === "button" && renderButton(),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept,
          multiple,
          onChange: handleInputChange,
          disabled,
          style: { display: "none" },
          "aria-label": "File input"
        }
      ),
      errorMessage && /* @__PURE__ */ jsxRuntime.jsx("p", { style: errorStyle, children: errorMessage }),
      helperText && !errorMessage && /* @__PURE__ */ jsxRuntime.jsx("p", { id: "uploader-helper", style: helperStyle, children: helperText }),
      renderFileList()
    ] });
  }
);
Uploader.displayName = "Uploader";
if (typeof document !== "undefined") {
  const styleId = "vistral-uploader-spinner";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var SELECT_TOKENS = {
  // Trigger states
  trigger: {
    bg: "#ffffff",
    border: "#d4d4d8",
    borderHover: "#a1a1aa",
    borderFocus: "#2050f6",
    borderError: "#dc2626",
    fg: "#18181b",
    placeholder: "#a1a1aa",
    disabled: {
      bg: "#f4f4f5",
      border: "#e4e4e7",
      fg: "#a1a1aa"
    }
  },
  // Dropdown menu
  menu: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    maxHeight: 256
  },
  // Option item
  option: {
    height: 40,
    paddingX: 12,
    bg: "transparent",
    bgHover: "#f4f4f5",
    bgSelected: "#eef4ff",
    fg: "#18181b",
    fgSelected: "#2050f6"
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 10, fontSize: 13 },
    md: { height: 40, paddingX: 12, fontSize: 14 },
    lg: { height: 48, paddingX: 14, fontSize: 16 }
  },
  radius: 8
};
var Select = SelectPrimitive__namespace.Root;
var SelectGroup = SelectPrimitive__namespace.Group;
var SelectValue = SelectPrimitive__namespace.Value;
var SelectTrigger = React2__namespace.forwardRef(({ className, size = "md", error = false, label, helperText, fullWidth, ...props }, ref) => {
  const sizeTokens = SELECT_TOKENS.sizes[size];
  const triggerId = React2__namespace.useId();
  const helperId = helperText ? `select-helper-${triggerId}` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { width: fullWidth ? "100%" : "auto" }, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(
      "label",
      {
        htmlFor: triggerId,
        style: {
          display: "block",
          marginBottom: 6,
          fontSize: 14,
          fontWeight: 500,
          color: props.disabled ? "#a1a1aa" : "#18181b",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      SelectPrimitive__namespace.Trigger,
      {
        ref,
        id: triggerId,
        className: cn(
          // Base styles
          "flex w-full items-center justify-between rounded-lg border bg-white ring-offset-background",
          "data-[placeholder]:text-[#A1A1AA] text-[#18181B]",
          "focus:outline-none focus:ring-2 focus:ring-[#2050F6] focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&>span]:line-clamp-1",
          // Icon rotation when open
          "[&[data-state=open]>*:last-child>svg]:rotate-180",
          // Size-based styles
          size === "sm" && `h-8 text-[13px] px-[10px]`,
          size === "md" && `h-10 text-[14px] px-3`,
          size === "lg" && `h-12 text-[16px] px-[14px]`,
          // Border colors
          error ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]" : "border-[#d4d4d8] hover:border-[#a1a1aa] focus:border-[#2050f6]",
          // Dark mode
          "dark:bg-[#1a1a1a] dark:text-white",
          className
        ),
        style: {
          height: sizeTokens.height,
          paddingLeft: sizeTokens.paddingX,
          paddingRight: sizeTokens.paddingX,
          fontSize: sizeTokens.fontSize,
          ...props.style
        },
        "aria-label": label || props["aria-label"],
        "aria-invalid": error,
        "aria-describedby": helperId,
        ...props,
        children: [
          props.children,
          /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 opacity-50 transition-transform duration-200" }) })
        ]
      }
    ),
    helperText && /* @__PURE__ */ jsxRuntime.jsx(
      "p",
      {
        id: helperId,
        style: {
          margin: "6px 0 0",
          fontSize: 12,
          color: error ? "#dc2626" : "#71717a",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        children: helperText
      }
    )
  ] });
});
SelectTrigger.displayName = SelectPrimitive__namespace.Trigger.displayName;
var SelectScrollUpButton = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive__namespace.ScrollUpButton.displayName;
var SelectScrollDownButton = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive__namespace.ScrollDownButton.displayName;
var SelectContent = React2__namespace.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Content,
  {
    ref,
    className: cn(
      // Base styles from design system
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem]",
      "overflow-y-auto overflow-x-hidden rounded-md border bg-white text-[#18181b] shadow-md",
      // Animations
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "origin-[--radix-select-content-transform-origin]",
      // Popper positioning
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      // Design system tokens
      "border-[#e4e4e7]",
      "dark:bg-[#1a1a1a] dark:text-white",
      className
    ),
    position,
    style: {
      boxShadow: SELECT_TOKENS.menu.shadow,
      maxHeight: SELECT_TOKENS.menu.maxHeight,
      ...props.style
    },
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntime.jsx(
        SelectPrimitive__namespace.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive__namespace.Content.displayName;
var SelectLabel = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive__namespace.Label.displayName;
var SelectItem = React2__namespace.forwardRef(({ className, children, ...props }, ref) => {
  const checkmarkWidth = 16;
  const checkmarkLeft = 8;
  const gapAfterCheckmark = 8;
  const minPaddingLeft = checkmarkLeft + checkmarkWidth + gapAfterCheckmark;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    {
      ref,
      className: cn(
        // Base styles
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none",
        // Design system tokens
        "focus:bg-[#f4f4f5] focus:text-[#18181b]",
        "data-[highlighted]:bg-[#f4f4f5]",
        "data-[state=checked]:bg-[#eef4ff] data-[state=checked]:text-[#2050f6]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        // Dark mode
        "dark:focus:bg-[#262626] dark:data-[highlighted]:bg-[#262626]",
        "dark:data-[state=checked]:bg-[#1e3a8a] dark:data-[state=checked]:text-[#93c5fd]",
        className
      ),
      style: {
        height: SELECT_TOKENS.option.height,
        paddingLeft: Math.max(minPaddingLeft, SELECT_TOKENS.option.paddingX + 20),
        // Ensure enough space for checkmark
        paddingRight: SELECT_TOKENS.option.paddingX,
        ...props.style
      },
      role: "option",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
      ]
    }
  );
});
SelectItem.displayName = SelectPrimitive__namespace.Item.displayName;
var SelectSeparator = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-[#e4e4e7] dark:bg-[#333333]", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive__namespace.Separator.displayName;
var AUTOCOMPLETE_TOKENS = {
  // Input
  input: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: "#ffffff",
    border: "#d4d4d8",
    borderFocus: "#2050f6",
    radius: 8,
    placeholder: "#a1a1aa"
  },
  // Dropdown
  dropdown: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    maxHeight: 240
  },
  // Option
  option: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    fg: "#18181b",
    fgMuted: "#71717a",
    bgHover: "#f4f4f5",
    bgSelected: "#eef4ff"
  }
};
var Autocomplete = React2.forwardRef(
  ({
    options,
    value,
    onChange,
    onInputChange,
    placeholder = "Search...",
    clearable = true,
    loading = false,
    emptyMessage = "No results found",
    freeSolo = false,
    disabled,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React2.useState(false);
    const [inputValue, setInputValue] = React2.useState("");
    const [highlightedIndex, setHighlightedIndex] = React2.useState(-1);
    const [isFocused, setIsFocused] = React2.useState(false);
    const containerRef = React2.useRef(null);
    const inputRef = React2.useRef(null);
    React2.useEffect(() => {
      if (value) {
        const option = options.find((o) => o.value === value);
        if (option) {
          setInputValue(option.label);
        }
      } else {
        setInputValue("");
      }
    }, [value, options]);
    const filteredOptions = options.filter(
      (option) => option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    React2.useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      setHighlightedIndex(-1);
      onInputChange?.(newValue);
      if (freeSolo) {
        onChange?.(newValue);
      }
    };
    const handleSelect = (option) => {
      if (option.disabled) return;
      setInputValue(option.label);
      onChange?.(option.value);
      setIsOpen(false);
      inputRef.current?.blur();
    };
    const handleClear = () => {
      setInputValue("");
      onChange?.("");
      onInputChange?.("");
      inputRef.current?.focus();
    };
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setIsOpen(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex(
            (i) => i < filteredOptions.length - 1 ? i + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(
            (i) => i > 0 ? i - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    const containerStyle = {
      position: "relative",
      width: "100%",
      ...style
    };
    const inputContainerStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center"
    };
    const inputStyle = {
      width: "100%",
      height: AUTOCOMPLETE_TOKENS.input.height,
      padding: `0 ${clearable && inputValue ? 36 : 12}px 0 36px`,
      fontSize: AUTOCOMPLETE_TOKENS.input.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: AUTOCOMPLETE_TOKENS.input.bg,
      border: `1px solid ${isFocused ? AUTOCOMPLETE_TOKENS.input.borderFocus : AUTOCOMPLETE_TOKENS.input.border}`,
      borderRadius: AUTOCOMPLETE_TOKENS.input.radius,
      outline: "none",
      transition: "border-color 150ms ease",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text"
    };
    const iconStyle = {
      position: "absolute",
      left: 12,
      color: AUTOCOMPLETE_TOKENS.input.placeholder,
      pointerEvents: "none"
    };
    const clearStyle = {
      position: "absolute",
      right: 8,
      padding: 4,
      background: "none",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      color: "#71717a",
      display: "flex"
    };
    const dropdownStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: AUTOCOMPLETE_TOKENS.dropdown.bg,
      border: `1px solid ${AUTOCOMPLETE_TOKENS.dropdown.border}`,
      borderRadius: AUTOCOMPLETE_TOKENS.dropdown.radius,
      boxShadow: AUTOCOMPLETE_TOKENS.dropdown.shadow,
      maxHeight: AUTOCOMPLETE_TOKENS.dropdown.maxHeight,
      overflowY: "auto",
      zIndex: 50
    };
    const getOptionStyle = (index, option) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: AUTOCOMPLETE_TOKENS.option.height,
      padding: `0 ${AUTOCOMPLETE_TOKENS.option.paddingX}px`,
      fontSize: AUTOCOMPLETE_TOKENS.option.fontSize,
      color: option.disabled ? AUTOCOMPLETE_TOKENS.option.fgMuted : AUTOCOMPLETE_TOKENS.option.fg,
      backgroundColor: option.value === value ? AUTOCOMPLETE_TOKENS.option.bgSelected : index === highlightedIndex ? AUTOCOMPLETE_TOKENS.option.bgHover : "transparent",
      cursor: option.disabled ? "not-allowed" : "pointer",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    });
    const emptyStyle = {
      padding: 16,
      textAlign: "center",
      fontSize: 13,
      color: AUTOCOMPLETE_TOKENS.option.fgMuted,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, style: containerStyle, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: inputContainerStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { size: 16, style: iconStyle }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: inputRef,
            type: "text",
            value: inputValue,
            onChange: handleInputChange,
            onFocus: () => {
              setIsFocused(true);
              setIsOpen(true);
            },
            onBlur: () => setIsFocused(false),
            onKeyDown: handleKeyDown,
            placeholder,
            disabled,
            style: inputStyle,
            role: "combobox",
            "aria-expanded": isOpen,
            "aria-autocomplete": "list",
            ...props
          }
        ),
        clearable && inputValue && !disabled && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: clearStyle, onClick: handleClear, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 }) })
      ] }),
      isOpen && /* @__PURE__ */ jsxRuntime.jsx("div", { style: dropdownStyle, role: "listbox", children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { style: emptyStyle, children: "Loading..." }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { style: emptyStyle, children: emptyMessage }) : filteredOptions.map((option, index) => /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          role: "option",
          "aria-selected": option.value === value,
          "aria-disabled": option.disabled,
          style: getOptionStyle(index, option),
          onClick: () => handleSelect(option),
          onMouseEnter: () => setHighlightedIndex(index),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: option.label }),
            option.value === value && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16, style: { color: "#2050f6" } })
          ]
        },
        option.value
      )) })
    ] });
  }
);
Autocomplete.displayName = "Autocomplete";
var COMBOBOX_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: "#ffffff",
    border: "#d4d4d8",
    borderFocus: "#2050f6",
    borderError: "#ef4444",
    radius: 8,
    placeholder: "#a1a1aa"
  },
  // Dropdown
  dropdown: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    maxHeight: 240,
    padding: 4
  },
  // Search input in dropdown
  search: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    bg: "#fafafa",
    border: "#e4e4e7",
    radius: 6,
    placeholder: "#a1a1aa"
  },
  // Option
  option: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    fg: "#18181b",
    fgMuted: "#71717a",
    fgDisabled: "#a1a1aa",
    bgHover: "#f4f4f5",
    bgSelected: "#eef4ff",
    radius: 4
  },
  // Tag (multi-select)
  tag: {
    height: 24,
    paddingX: 8,
    fontSize: 12,
    bg: "#f4f4f5",
    fg: "#18181b",
    radius: 4
  },
  // Error
  error: {
    fontSize: 13,
    color: "#ef4444",
    marginTop: 4
  }
};
var Combobox = React2.forwardRef(
  ({
    options,
    value,
    onChange,
    multiple = false,
    placeholder = "Select an element",
    searchable = true,
    clearable = true,
    disabled = false,
    label,
    error,
    description,
    showCount = false,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React2.useState(false);
    const [search, setSearch] = React2.useState("");
    const [highlightedIndex, setHighlightedIndex] = React2.useState(-1);
    const containerRef = React2.useRef(null);
    const triggerRef = React2.useRef(null);
    const searchInputRef = React2.useRef(null);
    const selectedValues = multiple ? Array.isArray(value) ? value : [] : value ? [value] : [];
    const filteredOptions = options.filter(
      (option) => option.label.toLowerCase().includes(search.toLowerCase())
    );
    React2.useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
          setSearch("");
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClick);
      }
      return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);
    React2.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }, [isOpen, searchable]);
    const handleSelect = (option) => {
      if (option.disabled) return;
      if (multiple) {
        const newValue = selectedValues.includes(option.value) ? selectedValues.filter((v) => v !== option.value) : [...selectedValues, option.value];
        onChange?.(newValue);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
        setSearch("");
      }
    };
    const handleRemove = (val, e) => {
      e.stopPropagation();
      if (multiple) {
        onChange?.(selectedValues.filter((v) => v !== val));
      }
    };
    const handleClear = (e) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : "");
      setSearch("");
    };
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((i) => i < filteredOptions.length - 1 ? i + 1 : 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((i) => i > 0 ? i - 1 : filteredOptions.length - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearch("");
          break;
        case "Backspace":
          if (!search && multiple && selectedValues.length > 0) {
            onChange?.(selectedValues.slice(0, -1));
          }
          break;
      }
    };
    const getDisplayValue = () => {
      if (multiple) return null;
      const selected = options.find((o) => o.value === value);
      return selected?.label || "";
    };
    const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map(
        (part, i) => part.toLowerCase() === query.toLowerCase() ? /* @__PURE__ */ jsxRuntime.jsx("mark", { style: { backgroundColor: "transparent", color: "#2050f6", fontWeight: 600 }, children: part }, i) : part
      );
    };
    const containerStyle = {
      position: "relative",
      width: "100%",
      ...style
    };
    const triggerStyle = {
      display: "flex",
      alignItems: "center",
      flexWrap: multiple ? "wrap" : "nowrap",
      gap: 4,
      minHeight: COMBOBOX_TOKENS.trigger.height,
      padding: `4px ${COMBOBOX_TOKENS.trigger.paddingX}px`,
      backgroundColor: COMBOBOX_TOKENS.trigger.bg,
      border: `1px solid ${error ? COMBOBOX_TOKENS.trigger.borderError : isOpen ? COMBOBOX_TOKENS.trigger.borderFocus : COMBOBOX_TOKENS.trigger.border}`,
      borderRadius: COMBOBOX_TOKENS.trigger.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: "border-color 150ms ease"
    };
    const inputStyle = {
      flex: 1,
      minWidth: 60,
      border: "none",
      outline: "none",
      fontSize: COMBOBOX_TOKENS.trigger.fontSize,
      backgroundColor: "transparent",
      fontFamily: "inherit",
      color: selectedValues.length === 0 ? COMBOBOX_TOKENS.trigger.placeholder : COMBOBOX_TOKENS.option.fg
    };
    const tagStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: COMBOBOX_TOKENS.tag.height,
      padding: `0 ${COMBOBOX_TOKENS.tag.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.tag.fontSize,
      backgroundColor: COMBOBOX_TOKENS.tag.bg,
      color: COMBOBOX_TOKENS.tag.fg,
      borderRadius: COMBOBOX_TOKENS.tag.radius,
      whiteSpace: "nowrap"
    };
    const countBadgeStyle = {
      display: "flex",
      alignItems: "center",
      fontSize: COMBOBOX_TOKENS.trigger.fontSize,
      color: COMBOBOX_TOKENS.option.fgMuted,
      marginLeft: "auto",
      marginRight: 4
    };
    const dropdownStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      marginTop: 4,
      padding: COMBOBOX_TOKENS.dropdown.padding,
      backgroundColor: COMBOBOX_TOKENS.dropdown.bg,
      border: `1px solid ${COMBOBOX_TOKENS.dropdown.border}`,
      borderRadius: COMBOBOX_TOKENS.dropdown.radius,
      boxShadow: COMBOBOX_TOKENS.dropdown.shadow,
      maxHeight: COMBOBOX_TOKENS.dropdown.maxHeight,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      zIndex: 50
    };
    const searchContainerStyle = {
      padding: "8px",
      borderBottom: `1px solid ${COMBOBOX_TOKENS.dropdown.border}`
    };
    const searchInputStyle = {
      width: "100%",
      height: COMBOBOX_TOKENS.search.height,
      padding: `0 ${COMBOBOX_TOKENS.search.paddingX}px 0 36px`,
      fontSize: COMBOBOX_TOKENS.search.fontSize,
      backgroundColor: COMBOBOX_TOKENS.search.bg,
      border: `1px solid ${COMBOBOX_TOKENS.search.border}`,
      borderRadius: COMBOBOX_TOKENS.search.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      outline: "none"
    };
    const optionsContainerStyle = {
      overflowY: "auto",
      maxHeight: COMBOBOX_TOKENS.dropdown.maxHeight - (searchable ? 60 : 0)
    };
    const getOptionStyle = (index, option) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: COMBOBOX_TOKENS.option.height,
      padding: `0 ${COMBOBOX_TOKENS.option.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.option.fontSize,
      color: option.disabled ? COMBOBOX_TOKENS.option.fgDisabled : COMBOBOX_TOKENS.option.fg,
      backgroundColor: selectedValues.includes(option.value) ? COMBOBOX_TOKENS.option.bgSelected : index === highlightedIndex ? COMBOBOX_TOKENS.option.bgHover : "transparent",
      borderRadius: COMBOBOX_TOKENS.option.radius,
      cursor: option.disabled ? "not-allowed" : "pointer",
      transition: "background-color 150ms ease"
    });
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, style: containerStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: {
        display: "block",
        marginBottom: 6,
        fontSize: 14,
        fontWeight: 500,
        color: "#18181b",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref: triggerRef,
          style: triggerStyle,
          onClick: () => !disabled && setIsOpen(!isOpen),
          onKeyDown: handleKeyDown,
          tabIndex: disabled ? -1 : 0,
          role: "combobox",
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          children: [
            multiple && selectedValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return opt ? /* @__PURE__ */ jsxRuntime.jsxs("span", { style: tagStyle, children: [
                opt.label,
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => handleRemove(val, e),
                    style: {
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    },
                    "aria-label": `Remove ${opt.label}`,
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 12 })
                  }
                )
              ] }, val) : null;
            }),
            !isOpen && /* @__PURE__ */ jsxRuntime.jsx("span", { style: inputStyle, children: multiple ? selectedValues.length === 0 ? placeholder : "" : getDisplayValue() || placeholder }),
            showCount && selectedValues.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { style: countBadgeStyle, children: selectedValues.length }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", flexShrink: 0 }, children: [
              clearable && selectedValues.length > 0 && !isOpen && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClear,
                  style: {
                    background: "none",
                    border: "none",
                    padding: 2,
                    cursor: "pointer",
                    display: "flex",
                    color: "#71717a"
                  },
                  "aria-label": "Clear selection",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 })
                }
              ),
              isOpen ? /* @__PURE__ */ jsxRuntime.jsx(
                lucideReact.ChevronUp,
                {
                  size: 16,
                  style: {
                    color: "#71717a",
                    transition: "transform 150ms ease"
                  }
                }
              ) : /* @__PURE__ */ jsxRuntime.jsx(
                lucideReact.ChevronDown,
                {
                  size: 16,
                  style: {
                    color: "#71717a",
                    transition: "transform 150ms ease"
                  }
                }
              )
            ] })
          ]
        }
      ),
      (error || description) && /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
        fontSize: COMBOBOX_TOKENS.error.fontSize,
        color: error ? COMBOBOX_TOKENS.error.color : "#71717a",
        marginTop: COMBOBOX_TOKENS.error.marginTop,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }, children: error || description }),
      isOpen && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: dropdownStyle, role: "listbox", children: [
        searchable && /* @__PURE__ */ jsxRuntime.jsx("div", { style: searchContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.Search,
            {
              size: 16,
              style: {
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: COMBOBOX_TOKENS.search.placeholder
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref: searchInputRef,
              type: "text",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setHighlightedIndex(-1);
              },
              placeholder: "Search element",
              style: searchInputStyle
            }
          ),
          search && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              style: {
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
                display: "flex",
                color: COMBOBOX_TOKENS.search.placeholder
              },
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 14 })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: optionsContainerStyle, children: filteredOptions.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
          padding: 12,
          textAlign: "center",
          fontSize: 13,
          color: COMBOBOX_TOKENS.option.fgMuted,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }, children: "No element found" }) : filteredOptions.map((option, index) => /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            role: "option",
            "aria-selected": selectedValues.includes(option.value),
            style: getOptionStyle(index, option),
            onClick: () => handleSelect(option),
            onMouseEnter: () => setHighlightedIndex(index),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: highlightText(option.label, search) }),
              selectedValues.includes(option.value) && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16, style: { color: "#2050f6", flexShrink: 0 } })
            ]
          },
          option.value
        )) })
      ] })
    ] });
  }
);
Combobox.displayName = "Combobox";
function cn2(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var DIALOG_TOKENS = {
  // Overlay
  overlay: {
    bg: "rgba(0, 0, 0, 0.5)"
  },
  // Container
  container: {
    bg: "#ffffff",
    border: "#e4e4e7",
    radius: 12,
    shadow: "0px 16px 48px rgba(0, 0, 0, 0.16)"
  },
  // Desktop sizes
  desktop: {
    minWidth: 440,
    maxWidth: "40%",
    padding: 24,
    verticalSpace: 32,
    buttonHeight: 48
  },
  // Mobile/Tablet sizes
  mobile: {
    minWidth: 320,
    maxWidth: "90vw",
    padding: 24,
    verticalSpace: 32,
    buttonHeight: 48
  },
  // Max height
  maxHeight: "80vh",
  minHeight: "auto"
};
var Dialog = DialogPrimitive__namespace.Root;
var DialogTrigger = DialogPrimitive__namespace.Trigger;
var DialogPortal = DialogPrimitive__namespace.Portal;
var DialogClose = DialogPrimitive__namespace.Close;
var DialogOverlay = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Overlay,
  {
    ref,
    className: cn2(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    style: {
      backgroundColor: DIALOG_TOKENS.overlay.bg,
      ...props.style
    },
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive__namespace.Overlay.displayName;
var DialogContent = React2__namespace.forwardRef(({ className, children, size = "md", variant = "desktop", ...props }, ref) => {
  const isMobile = variant === "mobile" || variant === "bottom-sheet";
  const isBottomSheet = variant === "bottom-sheet";
  const getDesktopWidth = () => {
    switch (size) {
      case "sm":
        return 400;
      case "md":
        return 500;
      case "lg":
        return 640;
      case "xl":
        return 800;
      case "full":
        return "100%";
      default:
        return 500;
    }
  };
  const contentStyle = {
    backgroundColor: DIALOG_TOKENS.container.bg,
    borderColor: DIALOG_TOKENS.container.border,
    boxShadow: DIALOG_TOKENS.container.shadow,
    maxHeight: DIALOG_TOKENS.maxHeight,
    minHeight: DIALOG_TOKENS.minHeight,
    padding: DIALOG_TOKENS.desktop.padding,
    ...props.style
  };
  if (isMobile) {
    contentStyle.width = "100%";
    contentStyle.maxWidth = DIALOG_TOKENS.mobile.maxWidth;
    contentStyle.minWidth = DIALOG_TOKENS.mobile.minWidth;
    contentStyle.height = isBottomSheet ? "auto" : "100%";
    contentStyle.maxHeight = isBottomSheet ? "90vh" : "100%";
    contentStyle.borderRadius = isBottomSheet ? "16px 16px 0 0" : 0;
    contentStyle.position = "fixed";
    contentStyle.bottom = isBottomSheet ? 0 : void 0;
    contentStyle.top = isBottomSheet ? void 0 : 0;
    contentStyle.left = 0;
    contentStyle.right = 0;
    contentStyle.transform = "none";
  } else {
    const desktopWidth = getDesktopWidth();
    contentStyle.width = typeof desktopWidth === "number" ? `${desktopWidth}px` : desktopWidth;
    contentStyle.maxWidth = DIALOG_TOKENS.desktop.maxWidth;
    contentStyle.minWidth = DIALOG_TOKENS.desktop.minWidth;
    contentStyle.borderRadius = size === "full" ? 0 : DIALOG_TOKENS.container.radius;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        ref,
        className: cn2(
          // Base styles
          "fixed z-50 grid gap-4 overflow-y-auto",
          // Desktop positioning
          !isMobile && "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          !isMobile && "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          !isMobile && "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          !isMobile && "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          // Mobile animations
          isBottomSheet && "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          variant === "mobile" && "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
          // Dark mode
          "dark:bg-[#1a1a1a] dark:text-white",
          className
        ),
        style: contentStyle,
        ...props,
        children: [
          children,
          !isMobile && /* @__PURE__ */ jsxRuntime.jsxs(
            DialogPrimitive__namespace.Close,
            {
              className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2050f6] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#f4f4f5] data-[state=open]:text-[#71717a] dark:data-[state=open]:bg-[#262626] dark:data-[state=open]:text-[#a3a3a3]",
              style: {
                position: "absolute",
                right: "16px",
                top: "16px",
                zIndex: 50
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
DialogContent.displayName = DialogPrimitive__namespace.Content.displayName;
var DialogHeader = React2__namespace.forwardRef(
  ({ className, showBack, onBack, children, ...props }, ref) => {
    const handleBack = () => {
      if (onBack) {
        onBack();
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: cn2(
          "flex flex-col space-y-1.5",
          className
        ),
        style: {
          paddingBottom: DIALOG_TOKENS.desktop.verticalSpace
        },
        ...props,
        children: [
          showBack && /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              onClick: handleBack,
              className: "absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2050f6] focus:ring-offset-2 disabled:pointer-events-none",
              style: {
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f4f5",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Back" })
              ]
            }
          ) }),
          children
        ]
      }
    );
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogBody = React2__namespace.forwardRef(
  ({ className, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: cn2("overflow-y-auto", className),
      style: {
        flex: 1,
        ...style
      },
      ...props
    }
  )
);
DialogBody.displayName = "DialogBody";
var DialogFooter = React2__namespace.forwardRef(
  ({ className, stacked, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: cn2(
        stacked ? "flex flex-col gap-2" : "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      ),
      style: {
        paddingTop: DIALOG_TOKENS.desktop.verticalSpace,
        ...style
      },
      ...props
    }
  )
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Title,
  {
    ref,
    className: cn2(
      "text-lg font-semibold leading-none tracking-tight",
      "text-[#18181b] dark:text-white",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive__namespace.Title.displayName;
var DialogDescription = React2__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Description,
  {
    ref,
    className: cn2(
      "text-sm text-[#71717a] dark:text-[#a3a3a3]",
      className
    ),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive__namespace.Description.displayName;
var POPOVER_TOKENS = {
  bg: "#ffffff",
  border: "#e4e4e7",
  shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
  radius: 12,
  padding: 16,
  maxWidth: 320
};
var PopoverContext = React2.createContext(null);
function usePopover() {
  const context = React2.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
}
var Popover = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children
}) => {
  const [internalOpen, setInternalOpen] = React2.useState(defaultOpen);
  const triggerRef = React2.useRef(null);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverContext.Provider, { value: { open, setOpen, triggerRef }, children });
};
Popover.displayName = "Popover";
var PopoverTrigger = ({ children, asChild }) => {
  const { open, setOpen, triggerRef } = usePopover();
  const handleClick = () => setOpen(!open);
  if (asChild && React2__namespace.isValidElement(children)) {
    return React2__namespace.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "dialog"
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref: triggerRef,
      type: "button",
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      children
    }
  );
};
PopoverTrigger.displayName = "PopoverTrigger";
var PopoverContent = React2.forwardRef(
  ({ align = "center", side = "bottom", sideOffset = 8, style, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopover();
    const contentRef = React2.useRef(null);
    React2.useEffect(() => {
      if (!open) return;
      const handleClick = (e) => {
        const target = e.target;
        if (contentRef.current && !contentRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
          setOpen(false);
        }
      };
      const handleEscape = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen, triggerRef]);
    if (!open) return null;
    const getPositionStyles = () => {
      const alignStyles = {
        start: { left: 0 },
        center: { left: "50%", transform: "translateX(-50%)" },
        end: { right: 0 }
      };
      const sideStyles = {
        top: { bottom: "100%", marginBottom: sideOffset },
        bottom: { top: "100%", marginTop: sideOffset },
        left: { right: "100%", marginRight: sideOffset, top: 0 },
        right: { left: "100%", marginLeft: sideOffset, top: 0 }
      };
      if (side === "left" || side === "right") {
        const vertAlign = {
          start: { top: 0 },
          center: { top: "50%", transform: "translateY(-50%)" },
          end: { bottom: 0 }
        };
        return { ...sideStyles[side], ...vertAlign[align] };
      }
      return { ...sideStyles[side], ...alignStyles[align] };
    };
    const contentStyle = {
      position: "absolute",
      zIndex: 50,
      minWidth: 200,
      maxWidth: POPOVER_TOKENS.maxWidth,
      padding: POPOVER_TOKENS.padding,
      backgroundColor: POPOVER_TOKENS.bg,
      border: `1px solid ${POPOVER_TOKENS.border}`,
      borderRadius: POPOVER_TOKENS.radius,
      boxShadow: POPOVER_TOKENS.shadow,
      animation: "popover-show 150ms ease-out",
      ...getPositionStyles(),
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: ref || contentRef,
        role: "dialog",
        style: contentStyle,
        ...props,
        children
      }
    );
  }
);
PopoverContent.displayName = "PopoverContent";
var PopoverClose = ({ asChild, children, onClick, ...props }) => {
  const { setOpen } = usePopover();
  const handleClick = (e) => {
    setOpen(false);
    onClick?.(e);
  };
  if (asChild && React2__namespace.isValidElement(children)) {
    return React2__namespace.cloneElement(children, { onClick: handleClick });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: handleClick, ...props, children });
};
PopoverClose.displayName = "PopoverClose";
if (typeof document !== "undefined") {
  const styleId = "vistral-popover-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes popover-show {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
var SHEET_TOKENS = {
  // Overlay
  overlay: {
    bg: "rgba(0, 0, 0, 0.5)"
  },
  // Content
  content: {
    bg: "#ffffff",
    shadow: "0px 0px 24px rgba(0, 0, 0, 0.15)"
  },
  // Sizes
  sizes: {
    sm: 320,
    md: 400,
    lg: 540,
    xl: 720,
    full: "100%"
  },
  // Header
  header: {
    paddingX: 24,
    paddingY: 16,
    borderColor: "#e4e4e7"
  },
  // Body
  body: {
    padding: 24
  },
  // Footer
  footer: {
    paddingX: 24,
    paddingY: 16,
    borderColor: "#e4e4e7"
  }
};
var SheetContext = React2.createContext(null);
function useSheet() {
  const context = React2.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet");
  }
  return context;
}
var Sheet = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children
}) => {
  const [internalOpen, setInternalOpen] = React2.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(SheetContext.Provider, { value: { open, setOpen }, children });
};
Sheet.displayName = "Sheet";
var SheetTrigger = ({ children, asChild }) => {
  const { setOpen } = useSheet();
  if (asChild && React2__namespace.isValidElement(children)) {
    return React2__namespace.cloneElement(children, {
      onClick: () => setOpen(true)
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: () => setOpen(true), children });
};
SheetTrigger.displayName = "SheetTrigger";
var SheetContent = React2.forwardRef(
  ({
    side = "right",
    size = "md",
    showClose = true,
    closeOnOverlayClick = true,
    style,
    children,
    ...props
  }, ref) => {
    const { open, setOpen } = useSheet();
    React2.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);
    React2.useEffect(() => {
      if (!open) return;
      const handleEscape = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, setOpen]);
    if (!open) return null;
    const isHorizontal = side === "left" || side === "right";
    const sheetSize = SHEET_TOKENS.sizes[size];
    const overlayStyle = {
      position: "fixed",
      inset: 0,
      backgroundColor: SHEET_TOKENS.overlay.bg,
      zIndex: 50,
      animation: "sheet-overlay-show 200ms ease-out"
    };
    const contentStyle = {
      position: "fixed",
      [side]: 0,
      top: isHorizontal ? 0 : void 0,
      bottom: isHorizontal ? 0 : void 0,
      left: !isHorizontal ? 0 : void 0,
      right: !isHorizontal ? 0 : void 0,
      width: isHorizontal ? typeof sheetSize === "number" ? sheetSize : sheetSize : "100%",
      height: isHorizontal ? "100%" : typeof sheetSize === "number" ? sheetSize : sheetSize,
      maxWidth: isHorizontal ? "100vw" : void 0,
      maxHeight: !isHorizontal ? "100vh" : void 0,
      backgroundColor: SHEET_TOKENS.content.bg,
      boxShadow: SHEET_TOKENS.content.shadow,
      display: "flex",
      flexDirection: "column",
      zIndex: 51,
      animation: `sheet-slide-${side} 200ms ease-out`,
      ...style
    };
    const closeStyle = {
      position: "absolute",
      top: 16,
      right: 16,
      padding: 8,
      background: "none",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      color: "#71717a",
      display: "flex",
      zIndex: 1
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          style: overlayStyle,
          onClick: closeOnOverlayClick ? () => setOpen(false) : void 0,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          role: "dialog",
          "aria-modal": "true",
          style: contentStyle,
          ...props,
          children: [
            showClose && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: closeStyle, onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 20 }) }),
            children
          ]
        }
      )
    ] });
  }
);
SheetContent.displayName = "SheetContent";
var SheetHeader = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const headerStyle = {
      padding: `${SHEET_TOKENS.header.paddingY}px ${SHEET_TOKENS.header.paddingX}px`,
      borderBottom: `1px solid ${SHEET_TOKENS.header.borderColor}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: headerStyle, ...props, children });
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetTitle = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const titleStyle = {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      color: "#18181b",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("h2", { ref, style: titleStyle, ...props, children });
  }
);
SheetTitle.displayName = "SheetTitle";
var SheetDescription = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const descStyle = {
      margin: "4px 0 0",
      fontSize: 14,
      color: "#71717a",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, style: descStyle, ...props, children });
  }
);
SheetDescription.displayName = "SheetDescription";
var SheetBody = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const bodyStyle = {
      flex: 1,
      padding: SHEET_TOKENS.body.padding,
      overflowY: "auto",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: bodyStyle, ...props, children });
  }
);
SheetBody.displayName = "SheetBody";
var SheetFooter = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const footerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 8,
      padding: `${SHEET_TOKENS.footer.paddingY}px ${SHEET_TOKENS.footer.paddingX}px`,
      borderTop: `1px solid ${SHEET_TOKENS.footer.borderColor}`,
      marginTop: "auto",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: footerStyle, ...props, children });
  }
);
SheetFooter.displayName = "SheetFooter";
if (typeof document !== "undefined") {
  const styleId = "vistral-sheet-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes sheet-overlay-show {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes sheet-slide-right {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes sheet-slide-left {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      @keyframes sheet-slide-top {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      @keyframes sheet-slide-bottom {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}
var TOOLTIP_TOKENS = {
  // Container
  bg: "#18181b",
  // zinc-900
  fg: "#ffffff",
  radius: 6,
  // Sizes
  padding: {
    sm: { x: 8, y: 4 },
    md: { x: 12, y: 6 }
  },
  fontSize: {
    sm: 12,
    md: 13
  },
  // Animation
  offset: 8,
  delay: 300
};
var TooltipContext = React2.createContext(null);
function useTooltip() {
  const context = React2.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip");
  }
  return context;
}
var TooltipProvider = ({
  delayDuration = TOOLTIP_TOKENS.delay,
  children
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
};
TooltipProvider.displayName = "TooltipProvider";
var Tooltip = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = TOOLTIP_TOKENS.delay,
  children
}) => {
  const [internalOpen, setInternalOpen] = React2.useState(defaultOpen);
  const triggerRef = React2.useRef(null);
  const timeoutRef = React2.useRef(void 0);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (newOpen) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (newOpen) {
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) {
          setInternalOpen(true);
        }
        onOpenChange?.(true);
      }, delayDuration);
    } else {
      if (!isControlled) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    }
  };
  React2.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipContext.Provider, { value: { open, setOpen, triggerRef }, children });
};
Tooltip.displayName = "Tooltip";
var TooltipTrigger = ({ children, asChild }) => {
  const { setOpen, triggerRef } = useTooltip();
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  const handleBlur = () => setOpen(false);
  if (asChild && React2__namespace.isValidElement(children)) {
    return React2__namespace.cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      style: { display: "inline-flex" },
      children
    }
  );
};
TooltipTrigger.displayName = "TooltipTrigger";
var TooltipContent = React2.forwardRef(
  ({
    side = "top",
    align = "center",
    size = "md",
    arrow = true,
    style,
    children,
    ...props
  }, ref) => {
    const { open, triggerRef } = useTooltip();
    const [position, setPosition] = React2.useState({ top: 0, left: 0 });
    const contentRef = React2.useRef(null);
    React2.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;
      const trigger = triggerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();
      const offset = TOOLTIP_TOKENS.offset;
      let top = 0;
      let left = 0;
      switch (side) {
        case "top":
          top = trigger.top - content.height - offset;
          left = trigger.left + (trigger.width - content.width) / 2;
          break;
        case "bottom":
          top = trigger.bottom + offset;
          left = trigger.left + (trigger.width - content.width) / 2;
          break;
        case "left":
          top = trigger.top + (trigger.height - content.height) / 2;
          left = trigger.left - content.width - offset;
          break;
        case "right":
          top = trigger.top + (trigger.height - content.height) / 2;
          left = trigger.right + offset;
          break;
      }
      if (side === "top" || side === "bottom") {
        if (align === "start") {
          left = trigger.left;
        } else if (align === "end") {
          left = trigger.right - content.width;
        }
      }
      top += window.scrollY;
      left += window.scrollX;
      setPosition({ top, left });
    }, [open, side, align, triggerRef]);
    if (!open) return null;
    const padding = TOOLTIP_TOKENS.padding[size];
    const contentStyle = {
      position: "absolute",
      top: position.top,
      left: position.left,
      zIndex: 50,
      padding: `${padding.y}px ${padding.x}px`,
      backgroundColor: TOOLTIP_TOKENS.bg,
      color: TOOLTIP_TOKENS.fg,
      fontSize: TOOLTIP_TOKENS.fontSize[size],
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 500,
      lineHeight: 1.4,
      borderRadius: TOOLTIP_TOKENS.radius,
      whiteSpace: "nowrap",
      animation: "tooltip-show 150ms ease-out",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref: ref || contentRef, role: "tooltip", style: contentStyle, ...props, children });
  }
);
TooltipContent.displayName = "TooltipContent";
if (typeof document !== "undefined") {
  const styleId = "vistral-tooltip-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes tooltip-show {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
var DROPDOWN_TOKENS = {
  // Menu container
  menu: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    padding: 4,
    minWidth: 180
  },
  // Menu item
  item: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    bg: "transparent",
    bgHover: "#f4f4f5",
    bgFocus: "#f4f4f5",
    fg: "#18181b",
    fgDisabled: "#a1a1aa",
    fgDestructive: "#dc2626",
    radius: 4
  },
  // Separator
  separator: {
    color: "#e4e4e7",
    margin: 4
  },
  // Label
  label: {
    paddingX: 12,
    paddingY: 6,
    fontSize: 12,
    fontWeight: 600,
    color: "#71717a"
  }
};
var DropdownContext = React2.createContext(null);
function useDropdown() {
  const context = React2.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
}
var DropdownMenu = ({
  open: controlledOpen,
  onOpenChange,
  children
}) => {
  const [internalOpen, setInternalOpen] = React2.useState(false);
  const triggerRef = React2.useRef(null);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownContext.Provider, { value: { open, setOpen, triggerRef }, children });
};
DropdownMenu.displayName = "DropdownMenu";
var DropdownMenuTrigger = ({ children, asChild }) => {
  const { open, setOpen, triggerRef } = useDropdown();
  const handleClick = () => setOpen(!open);
  if (asChild && React2__namespace.isValidElement(children)) {
    return React2__namespace.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "menu"
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref: triggerRef,
      type: "button",
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "menu",
      children
    }
  );
};
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
var DropdownMenuContent = React2.forwardRef(
  ({ align = "start", side = "bottom", style, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdown();
    const contentRef = React2.useRef(null);
    React2.useEffect(() => {
      if (!open) return;
      const handleClick = (e) => {
        const target = e.target;
        if (contentRef.current && !contentRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
          setOpen(false);
        }
      };
      const handleEscape = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen, triggerRef]);
    if (!open) return null;
    const alignStyles = {
      start: { left: 0 },
      center: { left: "50%", transform: "translateX(-50%)" },
      end: { right: 0 }
    };
    const contentStyle = {
      position: "absolute",
      [side === "bottom" ? "top" : "bottom"]: "100%",
      marginTop: side === "bottom" ? 4 : void 0,
      marginBottom: side === "top" ? 4 : void 0,
      minWidth: DROPDOWN_TOKENS.menu.minWidth,
      padding: DROPDOWN_TOKENS.menu.padding,
      backgroundColor: DROPDOWN_TOKENS.menu.bg,
      border: `1px solid ${DROPDOWN_TOKENS.menu.border}`,
      borderRadius: DROPDOWN_TOKENS.menu.radius,
      boxShadow: DROPDOWN_TOKENS.menu.shadow,
      zIndex: 50,
      animation: "dropdown-show 150ms ease-out",
      ...alignStyles[align],
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: ref || contentRef,
        role: "menu",
        style: contentStyle,
        ...props,
        children
      }
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = React2.forwardRef(
  ({
    icon: Icon2,
    shortcut,
    disabled = false,
    destructive = false,
    closeOnClick = true,
    style,
    onClick,
    children,
    ...props
  }, ref) => {
    const { setOpen } = useDropdown();
    const [isHovered, setIsHovered] = React2.useState(false);
    const itemStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: DROPDOWN_TOKENS.item.height,
      padding: `0 ${DROPDOWN_TOKENS.item.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.item.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: disabled ? DROPDOWN_TOKENS.item.fgDisabled : destructive ? DROPDOWN_TOKENS.item.fgDestructive : DROPDOWN_TOKENS.item.fg,
      backgroundColor: isHovered && !disabled ? DROPDOWN_TOKENS.item.bgHover : DROPDOWN_TOKENS.item.bg,
      borderRadius: DROPDOWN_TOKENS.item.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 100ms ease",
      ...style
    };
    const shortcutStyle = {
      marginLeft: "auto",
      fontSize: 12,
      color: "#a1a1aa"
    };
    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      if (closeOnClick) setOpen(false);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "menuitem",
        "aria-disabled": disabled,
        style: itemStyle,
        onClick: handleClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          Icon2 && /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 16 }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1 }, children }),
          shortcut && /* @__PURE__ */ jsxRuntime.jsx("span", { style: shortcutStyle, children: shortcut })
        ]
      }
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuSeparator = React2.forwardRef(
  ({ style, ...props }, ref) => {
    const sepStyle = {
      height: 1,
      margin: `${DROPDOWN_TOKENS.separator.margin}px 0`,
      backgroundColor: DROPDOWN_TOKENS.separator.color,
      border: "none",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("hr", { ref, style: sepStyle, ...props });
  }
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuLabel = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const labelStyle = {
      padding: `${DROPDOWN_TOKENS.label.paddingY}px ${DROPDOWN_TOKENS.label.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.label.fontSize,
      fontWeight: DROPDOWN_TOKENS.label.fontWeight,
      color: DROPDOWN_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: labelStyle, ...props, children });
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";
var DropdownMenuCheckboxItem = React2.forwardRef(
  ({ checked = false, onCheckedChange, onClick, children, ...props }, ref) => {
    const { setOpen } = useDropdown();
    const [isHovered, setIsHovered] = React2.useState(false);
    const handleClick = (e) => {
      onCheckedChange?.(!checked);
      onClick?.(e);
    };
    const itemStyle = {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: DROPDOWN_TOKENS.item.height,
      padding: `0 ${DROPDOWN_TOKENS.item.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.item.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: DROPDOWN_TOKENS.item.fg,
      backgroundColor: isHovered ? DROPDOWN_TOKENS.item.bgHover : DROPDOWN_TOKENS.item.bg,
      borderRadius: DROPDOWN_TOKENS.item.radius,
      cursor: "pointer",
      transition: "background-color 100ms ease"
    };
    const checkboxStyle = {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: checked ? "none" : "1.5px solid #d4d4d8",
      backgroundColor: checked ? "#2050f6" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 150ms ease"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "menuitemcheckbox",
        "aria-checked": checked,
        style: itemStyle,
        onClick: handleClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: checkboxStyle, children: checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 12, color: "#ffffff", strokeWidth: 3 }) }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1 }, children })
        ]
      }
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
if (typeof document !== "undefined") {
  const styleId = "vistral-dropdown-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes dropdown-show {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}
var CONTEXT_MENU_TOKENS = {
  // Menu
  menu: {
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 8,
    padding: 4,
    minWidth: 180,
    maxWidth: 320
  },
  // Item
  item: {
    height: 32,
    paddingX: 12,
    fontSize: 13,
    fg: "#18181b",
    fgMuted: "#a1a1aa",
    fgDestructive: "#dc2626",
    bgHover: "#f4f4f5",
    radius: 4,
    iconSize: 14
  },
  // Label (non-interactive)
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#71717a",
    paddingX: 12,
    paddingY: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  // Separator
  separator: {
    color: "#e4e4e7",
    margin: 4
  }
};
var ContextMenuContext = React2.createContext(null);
function useContextMenu() {
  const context = React2.useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within a ContextMenu");
  }
  return context;
}
var ContextMenu = ({ children, onOpenChange }) => {
  const [position, setPosition] = React2.useState(null);
  const closeMenu = () => setPosition(null);
  React2.useEffect(() => {
    onOpenChange?.(position !== null);
  }, [position, onOpenChange]);
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuContext.Provider, { value: { position, setPosition, closeMenu }, children });
};
ContextMenu.displayName = "ContextMenu";
var ContextMenuTrigger = React2.forwardRef(
  ({ asChild, children, ...props }, ref) => {
    const { setPosition } = useContextMenu();
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setPosition({ x: e.clientX, y: e.clientY });
    };
    if (asChild && React2__namespace.isValidElement(children)) {
      return React2__namespace.cloneElement(children, {
        onContextMenu: handleContextMenu
      });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, onContextMenu: handleContextMenu, ...props, children });
  }
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";
var ContextMenuContent = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const { position, closeMenu } = useContextMenu();
    const menuRef = React2.useRef(null);
    React2.useEffect(() => {
      if (!position) return;
      const handleClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          closeMenu();
        }
      };
      const handleEscape = (e) => {
        if (e.key === "Escape") closeMenu();
      };
      setTimeout(() => {
        document.addEventListener("click", handleClick, true);
        document.addEventListener("keydown", handleEscape);
      }, 0);
      return () => {
        document.removeEventListener("click", handleClick, true);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [position, closeMenu]);
    React2.useEffect(() => {
      if (!position || !menuRef.current) return;
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let adjustedX = position.x;
      let adjustedY = position.y;
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 8;
      }
      if (adjustedX < 8) {
        adjustedX = 8;
      }
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 8;
      }
      if (adjustedY < 8) {
        adjustedY = 8;
      }
      if (adjustedX !== position.x || adjustedY !== position.y) {
        menu.style.left = `${adjustedX}px`;
        menu.style.top = `${adjustedY}px`;
      }
    }, [position]);
    if (!position) return null;
    const menuStyle = {
      position: "fixed",
      top: position.y,
      left: position.x,
      minWidth: CONTEXT_MENU_TOKENS.menu.minWidth,
      maxWidth: CONTEXT_MENU_TOKENS.menu.maxWidth,
      padding: CONTEXT_MENU_TOKENS.menu.padding,
      backgroundColor: CONTEXT_MENU_TOKENS.menu.bg,
      border: `1px solid ${CONTEXT_MENU_TOKENS.menu.border}`,
      borderRadius: CONTEXT_MENU_TOKENS.menu.radius,
      boxShadow: CONTEXT_MENU_TOKENS.menu.shadow,
      zIndex: 100,
      animation: "context-menu-show 100ms ease-out",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref: ref || menuRef, role: "menu", style: menuStyle, ...props, children });
  }
);
ContextMenuContent.displayName = "ContextMenuContent";
var ContextMenuLabel = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const labelStyle = {
      padding: `${CONTEXT_MENU_TOKENS.label.paddingY}px ${CONTEXT_MENU_TOKENS.label.paddingX}px`,
      fontSize: CONTEXT_MENU_TOKENS.label.fontSize,
      fontWeight: CONTEXT_MENU_TOKENS.label.fontWeight,
      color: CONTEXT_MENU_TOKENS.label.color,
      textTransform: CONTEXT_MENU_TOKENS.label.textTransform,
      letterSpacing: CONTEXT_MENU_TOKENS.label.letterSpacing,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "presentation", style: labelStyle, ...props, children });
  }
);
ContextMenuLabel.displayName = "ContextMenuLabel";
var ContextMenuItem = React2.forwardRef(
  ({ icon: Icon2, rightIcon: RightIcon, shortcut, disabled, destructive, hasSubmenu, style, onClick, children, ...props }, ref) => {
    const { closeMenu } = useContextMenu();
    const [isHovered, setIsHovered] = React2.useState(false);
    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      if (!hasSubmenu) {
        closeMenu();
      }
    };
    const itemStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: CONTEXT_MENU_TOKENS.item.height,
      padding: `0 ${CONTEXT_MENU_TOKENS.item.paddingX}px`,
      fontSize: CONTEXT_MENU_TOKENS.item.fontSize,
      color: disabled ? CONTEXT_MENU_TOKENS.item.fgMuted : destructive ? CONTEXT_MENU_TOKENS.item.fgDestructive : CONTEXT_MENU_TOKENS.item.fg,
      backgroundColor: isHovered && !disabled ? CONTEXT_MENU_TOKENS.item.bgHover : "transparent",
      borderRadius: CONTEXT_MENU_TOKENS.item.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "menuitem",
        "aria-disabled": disabled,
        style: itemStyle,
        onClick: handleClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          Icon2 && /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: CONTEXT_MENU_TOKENS.item.iconSize, style: { flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1 }, children }),
          shortcut && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 11, color: CONTEXT_MENU_TOKENS.item.fgMuted, marginLeft: "auto" }, children: shortcut }),
          hasSubmenu && !shortcut && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: CONTEXT_MENU_TOKENS.item.iconSize, style: { color: CONTEXT_MENU_TOKENS.item.fgMuted, flexShrink: 0 } }),
          RightIcon && !hasSubmenu && !shortcut && /* @__PURE__ */ jsxRuntime.jsx(RightIcon, { size: CONTEXT_MENU_TOKENS.item.iconSize, style: { flexShrink: 0 } })
        ]
      }
    );
  }
);
ContextMenuItem.displayName = "ContextMenuItem";
var ContextMenuSeparator = React2.forwardRef(
  ({ style, ...props }, ref) => {
    const sepStyle = {
      height: 1,
      margin: `${CONTEXT_MENU_TOKENS.separator.margin}px 0`,
      backgroundColor: CONTEXT_MENU_TOKENS.separator.color,
      border: "none",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("hr", { ref, style: sepStyle, ...props });
  }
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";
var ContextMenuCheckboxItem = React2.forwardRef(
  ({ checked, onCheckedChange, onClick, children, ...props }, ref) => {
    const handleClick = (e) => {
      onCheckedChange?.(!checked);
      onClick?.(e);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(ContextMenuItem, { ref, onClick: handleClick, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { width: 16, display: "flex", justifyContent: "center", alignItems: "center" }, children: checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 12, style: { color: "#2050f6" } }) }),
      children
    ] });
  }
);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
var ContextMenuRadioItem = React2.forwardRef(
  ({ checked, onCheckedChange, onClick, children, ...props }, ref) => {
    const handleClick = (e) => {
      onCheckedChange?.(!checked);
      onClick?.(e);
    };
    const radioStyle = {
      width: 12,
      height: 12,
      borderRadius: "50%",
      border: `2px solid ${checked ? "#2050f6" : "#d4d4d8"}`,
      backgroundColor: checked ? "#2050f6" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    };
    const innerDotStyle = {
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "#ffffff"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(ContextMenuItem, { ref, onClick: handleClick, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: radioStyle, children: checked && /* @__PURE__ */ jsxRuntime.jsx("span", { style: innerDotStyle }) }),
      children
    ] });
  }
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
var ContextMenuSubmenu = ({ label, children, icon: Icon2 }) => {
  const [isOpen, setIsOpen] = React2.useState(false);
  const submenuRef = React2.useRef(null);
  const itemRef = React2.useRef(null);
  React2.useEffect(() => {
    if (!isOpen || !submenuRef.current || !itemRef.current) return;
    const itemRect = itemRef.current.getBoundingClientRect();
    const submenu = submenuRef.current;
    submenu.style.left = `${itemRect.width}px`;
    submenu.style.top = "0px";
  }, [isOpen]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ContextMenuItem,
      {
        ref: itemRef,
        icon: Icon2,
        hasSubmenu: true,
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        children: label
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: submenuRef,
        style: {
          position: "absolute",
          left: "100%",
          top: 0,
          minWidth: CONTEXT_MENU_TOKENS.menu.minWidth,
          padding: CONTEXT_MENU_TOKENS.menu.padding,
          backgroundColor: CONTEXT_MENU_TOKENS.menu.bg,
          border: `1px solid ${CONTEXT_MENU_TOKENS.menu.border}`,
          borderRadius: CONTEXT_MENU_TOKENS.menu.radius,
          boxShadow: CONTEXT_MENU_TOKENS.menu.shadow,
          zIndex: 101
        },
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        role: "menu",
        children
      }
    )
  ] });
};
ContextMenuSubmenu.displayName = "ContextMenuSubmenu";
if (typeof document !== "undefined") {
  const styleId = "vistral-context-menu-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes context-menu-show {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
var TABS_TOKENS = {
  // Level 1: Main Tabs (transparent background, bottom indicator)
  level1: {
    list: {
      gap: 0,
      borderBottom: "#e4e4e7",
      bg: "transparent"
    },
    trigger: {
      height: 44,
      paddingX: 16,
      fontSize: 14,
      fontWeight: 500,
      fg: "#71717a",
      fgHover: "#18181b",
      fgActive: "#18181b",
      fgDisabled: "#d4d4d8",
      indicator: "#2050f6",
      indicatorHeight: 2
    }
  },
  // Level 2: Segmented Controls (solid background, capsule active)
  level2: {
    list: {
      gap: 0,
      bg: "#f4f4f5",
      padding: 4,
      radius: 9999
    },
    trigger: {
      height: 36,
      paddingX: 16,
      fontSize: 14,
      fontWeight: 500,
      fg: "#71717a",
      fgHover: "#18181b",
      fgActive: "#18181b",
      fgDisabled: "#d4d4d8",
      activeBg: "#ffffff",
      activeRadius: 9999,
      activeShadow: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)"
    }
  },
  // Notification badge
  badge: {
    size: 6,
    bg: "#dc2626",
    radius: "50%"
  },
  // Tag
  tag: {
    fontSize: 10,
    fontWeight: 600,
    paddingX: 6,
    paddingY: 2,
    radius: 4,
    bg: "#eef4ff",
    fg: "#2050f6"
  }
};
var TabsContext = React2.createContext(null);
function useTabs() {
  const context = React2.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs");
  }
  return context;
}
var Tabs = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    level = 1,
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleValueChange = (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(TabsContext.Provider, { value: { value, onValueChange: handleValueChange, level }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style, ...props, children }) });
  }
);
Tabs.displayName = "Tabs";
var TabsList = React2.forwardRef(
  ({ variant, style, children, ...props }, ref) => {
    const { level } = useTabs();
    const effectiveLevel = variant === "pills" ? 2 : level;
    const tokens = effectiveLevel === 1 ? TABS_TOKENS.level1 : TABS_TOKENS.level2;
    const listStyle = effectiveLevel === 1 ? {
      display: "flex",
      gap: tokens.list.gap,
      borderBottom: `1px solid ${tokens.list.borderBottom}`,
      backgroundColor: tokens.list.bg,
      ...style
    } : {
      display: "inline-flex",
      alignItems: "center",
      gap: 0,
      padding: tokens.list.padding,
      backgroundColor: tokens.list.bg,
      borderRadius: tokens.list.radius,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "tablist", style: listStyle, ...props, children });
  }
);
TabsList.displayName = "TabsList";
var TabsTrigger = React2.forwardRef(
  ({ value: tabValue, icon: Icon2, badge, tag, variant, disabled, style, children, ...props }, ref) => {
    const { value, onValueChange, level } = useTabs();
    const [isHovered, setIsHovered] = React2.useState(false);
    const isActive = value === tabValue;
    const effectiveLevel = variant === "pills" ? 2 : level;
    const tokens = effectiveLevel === 1 ? TABS_TOKENS.level1 : TABS_TOKENS.level2;
    const getColor = () => {
      if (disabled) return tokens.trigger.fgDisabled;
      if (isActive) return tokens.trigger.fgActive;
      if (isHovered) return tokens.trigger.fgHover;
      return tokens.trigger.fg;
    };
    const triggerId = React2.useId();
    const panelId = `tabpanel-${tabValue}`;
    const defaultStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      height: tokens.trigger.height,
      padding: `0 ${tokens.trigger.paddingX}px`,
      fontSize: tokens.trigger.fontSize,
      fontWeight: tokens.trigger.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: "transparent",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "color 150ms ease-in-out",
      whiteSpace: "nowrap",
      ...style
    };
    const pillStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      height: tokens.trigger.height,
      padding: `0 ${tokens.trigger.paddingX}px`,
      fontSize: tokens.trigger.fontSize,
      fontWeight: tokens.trigger.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: isActive && effectiveLevel === 2 ? tokens.trigger.activeBg : "transparent",
      border: "none",
      borderRadius: effectiveLevel === 2 ? tokens.trigger.activeRadius : void 0,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 150ms ease-in-out",
      boxShadow: isActive && effectiveLevel === 2 ? tokens.trigger.activeShadow : "none",
      whiteSpace: "nowrap",
      ...style
    };
    const indicatorStyle = {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: effectiveLevel === 1 ? tokens.trigger.indicatorHeight : 0,
      backgroundColor: effectiveLevel === 1 ? tokens.trigger.indicator : "transparent",
      transform: isActive ? "scaleX(1)" : "scaleX(0)",
      transition: "transform 200ms ease-in-out"
    };
    const badgeStyle = {
      position: "absolute",
      top: 4,
      right: 4,
      width: typeof badge === "number" ? "auto" : TABS_TOKENS.badge.size,
      height: TABS_TOKENS.badge.size,
      minWidth: typeof badge === "number" ? 16 : TABS_TOKENS.badge.size,
      padding: typeof badge === "number" ? "0 4px" : 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: TABS_TOKENS.badge.bg,
      borderRadius: TABS_TOKENS.badge.radius,
      fontSize: typeof badge === "number" ? 10 : 0,
      fontWeight: 600,
      color: "#ffffff",
      fontFamily: "inherit"
    };
    const tagStyle = {
      fontSize: TABS_TOKENS.tag.fontSize,
      fontWeight: TABS_TOKENS.tag.fontWeight,
      padding: `${TABS_TOKENS.tag.paddingY}px ${TABS_TOKENS.tag.paddingX}px`,
      backgroundColor: TABS_TOKENS.tag.bg,
      color: TABS_TOKENS.tag.fg,
      borderRadius: TABS_TOKENS.tag.radius,
      fontFamily: "inherit",
      lineHeight: 1
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        role: "tab",
        id: triggerId,
        "aria-selected": isActive,
        "aria-controls": panelId,
        "aria-disabled": disabled,
        disabled,
        style: effectiveLevel === 1 ? defaultStyle : pillStyle,
        onClick: () => !disabled && onValueChange(tabValue),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) {
              onValueChange(tabValue);
            }
          }
        },
        ...props,
        children: [
          Icon2 && /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 16 }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children }),
          tag && /* @__PURE__ */ jsxRuntime.jsx("span", { style: tagStyle, children: tag }),
          badge && /* @__PURE__ */ jsxRuntime.jsx("span", { style: badgeStyle, children: typeof badge === "number" ? badge : "" }),
          effectiveLevel === 1 && /* @__PURE__ */ jsxRuntime.jsx("span", { style: indicatorStyle })
        ]
      }
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React2.forwardRef(
  ({ value: tabValue, style, children, ...props }, ref) => {
    const { value } = useTabs();
    const isActive = value === tabValue;
    const panelId = `tabpanel-${tabValue}`;
    if (!isActive) return null;
    const contentStyle = {
      padding: 16,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "tabpanel",
        id: panelId,
        tabIndex: 0,
        style: contentStyle,
        ...props,
        children
      }
    );
  }
);
TabsContent.displayName = "TabsContent";
var ACCORDION_TOKENS = {
  // Container
  border: "#e4e4e7",
  // zinc-200
  radius: 8,
  // Item
  padding: {
    x: 16,
    y: 16
  },
  // Header
  header: {
    bg: "transparent",
    bgHover: "#fafafa",
    // zinc-50
    fg: "#18181b"
    // zinc-900
  },
  // Content
  content: {
    fg: "#52525b"
    // zinc-600
  }
};
var AccordionContext = React2.createContext(null);
function useAccordion() {
  const context = React2.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}
var AccordionItemContext = React2.createContext(null);
function useAccordionItem() {
  const context = React2.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem");
  }
  return context;
}
var Accordion = React2.forwardRef(
  ({
    type = "single",
    defaultValue = [],
    value,
    onValueChange,
    collapsible = true,
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const expandedItems = value ?? internalValue;
    const toggleItem = (itemValue) => {
      let newValue;
      if (type === "single") {
        if (expandedItems.includes(itemValue)) {
          newValue = collapsible ? [] : expandedItems;
        } else {
          newValue = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          newValue = expandedItems.filter((v) => v !== itemValue);
        } else {
          newValue = [...expandedItems, itemValue];
        }
      }
      if (!value) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    const containerStyle = {
      // No outer border, only dividers between items
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(AccordionContext.Provider, { value: { expandedItems, toggleItem, type }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: containerStyle, ...props, children }) });
  }
);
Accordion.displayName = "Accordion";
var AccordionItem = React2.forwardRef(
  ({ value, disabled = false, style, children, ...props }, ref) => {
    const { expandedItems } = useAccordion();
    const isExpanded = expandedItems.includes(value);
    const triggerId = React2.useId();
    const contentId = React2.useId();
    const itemStyle = {
      borderBottom: `1px solid ${ACCORDION_TOKENS.border}`,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(AccordionItemContext.Provider, { value: { value, isExpanded, triggerId, contentId }, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        "data-accordion-item": true,
        "data-state": isExpanded ? "open" : "closed",
        "data-disabled": disabled || void 0,
        style: itemStyle,
        ...props,
        children
      }
    ) });
  }
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React2.forwardRef(
  ({ showIcon = true, style, children, ...props }, ref) => {
    const { toggleItem } = useAccordion();
    const { value, isExpanded, triggerId, contentId } = useAccordionItem();
    const [isHovered, setIsHovered] = React2.useState(false);
    const triggerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: `${ACCORDION_TOKENS.padding.y}px ${ACCORDION_TOKENS.padding.x}px`,
      backgroundColor: isHovered ? ACCORDION_TOKENS.header.bgHover : ACCORDION_TOKENS.header.bg,
      color: ACCORDION_TOKENS.header.fg,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      transition: "background-color 150ms ease-in-out",
      ...style
    };
    const iconStyle = {
      flexShrink: 0,
      marginLeft: 12,
      transition: "transform 200ms ease-in-out",
      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        id: triggerId,
        "aria-expanded": isExpanded,
        "aria-controls": contentId,
        style: triggerStyle,
        onClick: () => toggleItem(value),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1 }, children }),
          showIcon && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 16, style: iconStyle })
        ]
      }
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const { isExpanded, triggerId, contentId } = useAccordionItem();
    const wrapperStyle = {
      overflow: "hidden",
      transition: "max-height 200ms ease-in-out",
      maxHeight: isExpanded ? 500 : 0
    };
    const contentStyle = {
      padding: `0 ${ACCORDION_TOKENS.padding.x}px ${ACCORDION_TOKENS.padding.y}px`,
      fontSize: 14,
      lineHeight: 1.6,
      color: ACCORDION_TOKENS.content.fg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { style: wrapperStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        id: contentId,
        role: "region",
        "aria-labelledby": triggerId,
        hidden: !isExpanded,
        style: contentStyle,
        ...props,
        children
      }
    ) });
  }
);
AccordionContent.displayName = "AccordionContent";
var BREADCRUMB_TOKENS = {
  fontSize: 14,
  gap: 8,
  // Link
  link: {
    color: "#71717a",
    colorHover: "#2050f6",
    fontWeight: 400
  },
  // Current
  current: {
    color: "#18181b",
    fontWeight: 500
  },
  // Separator
  separator: {
    color: "#a1a1aa",
    size: 16
  }
};
var Breadcrumb = React2.forwardRef(
  ({ separator, style, children, ...props }, ref) => {
    const navStyle = {
      display: "flex",
      alignItems: "center",
      ...style
    };
    const listStyle = {
      display: "flex",
      alignItems: "center",
      gap: BREADCRUMB_TOKENS.gap,
      margin: 0,
      padding: 0,
      listStyle: "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: BREADCRUMB_TOKENS.fontSize
    };
    const childArray = React2__namespace.Children.toArray(children);
    const itemsWithSeparators = childArray.flatMap((child, index) => {
      if (index === childArray.length - 1) return [child];
      return [
        child,
        /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, { children: separator }, `sep-${index}`)
      ];
    });
    return /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, "aria-label": "Breadcrumb", style: navStyle, ...props, children: /* @__PURE__ */ jsxRuntime.jsx("ol", { style: listStyle, children: itemsWithSeparators }) });
  }
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbItem = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const itemStyle = {
      display: "inline-flex",
      alignItems: "center",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("li", { ref, style: itemStyle, ...props, children });
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React2.forwardRef(
  ({ current = false, href, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    if (current) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          "aria-current": "page",
          style: {
            color: BREADCRUMB_TOKENS.current.color,
            fontWeight: BREADCRUMB_TOKENS.current.fontWeight,
            ...style
          },
          children
        }
      );
    }
    const linkStyle = {
      color: isHovered ? BREADCRUMB_TOKENS.link.colorHover : BREADCRUMB_TOKENS.link.color,
      fontWeight: BREADCRUMB_TOKENS.link.fontWeight,
      textDecoration: "none",
      transition: "color 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        href,
        style: linkStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbSeparator = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const sepStyle = {
      display: "flex",
      alignItems: "center",
      color: BREADCRUMB_TOKENS.separator.color,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("span", { ref, role: "presentation", "aria-hidden": "true", style: sepStyle, ...props, children: children || /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: BREADCRUMB_TOKENS.separator.size }) });
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbHome = React2.forwardRef(
  ({ iconOnly = false, label = "Home", ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbLink, { ref, ...props, children: /* @__PURE__ */ jsxRuntime.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Home, { size: 16 }),
      !iconOnly && /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
    ] }) });
  }
);
BreadcrumbHome.displayName = "BreadcrumbHome";
var NAVBAR_TOKENS = {
  height: 56,
  heightMobile: 48,
  paddingX: 16,
  bg: "#ffffff",
  border: "#e4e4e7",
  // Title
  title: {
    fontSize: 17,
    fontWeight: 600,
    color: "#18181b"
  },
  // Back button
  back: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2050f6"
  },
  // Divider between back and title
  divider: {
    width: 1,
    height: 24,
    color: "#e4e4e7",
    marginX: 12
  },
  // Actions
  action: {
    size: 40,
    iconSize: 20,
    color: "#3f3f46",
    colorHover: "#18181b"
  },
  // Tools button (outlined/dashed)
  toolsButton: {
    height: 36,
    paddingX: 16,
    fontSize: 14,
    fontWeight: 500,
    color: "#7c3aed",
    // Purple
    border: "#c4b5fd",
    // Light purple
    borderStyle: "dashed",
    radius: 8
  },
  // Secondary button (text)
  secondaryButton: {
    height: 36,
    paddingX: 16,
    fontSize: 14,
    fontWeight: 500,
    color: "#2050f6"
  },
  // Primary button (solid)
  primaryButton: {
    height: 36,
    paddingX: 20,
    fontSize: 14,
    fontWeight: 500,
    bg: "#2050f6",
    color: "#ffffff",
    radius: 9999
    // Pill
  },
  // Tools area
  tools: {
    gap: 12
  }
};
var Navbar = React2.forwardRef(
  ({ fixed = false, bordered = true, transparent = false, style, children, ...props }, ref) => {
    const navStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: NAVBAR_TOKENS.height,
      padding: `0 ${NAVBAR_TOKENS.paddingX}px`,
      backgroundColor: transparent ? "transparent" : NAVBAR_TOKENS.bg,
      borderBottom: bordered ? `1px solid ${NAVBAR_TOKENS.border}` : "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...fixed && {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40
      },
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, style: navStyle, ...props, children });
  }
);
Navbar.displayName = "Navbar";
var NavbarBrand = React2.forwardRef(
  ({ logo, name, href, style, children, ...props }, ref) => {
    const brandStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      color: "inherit",
      ...style
    };
    const nameStyle = {
      fontSize: NAVBAR_TOKENS.title.fontSize,
      fontWeight: NAVBAR_TOKENS.title.fontWeight,
      color: NAVBAR_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      logo,
      name && /* @__PURE__ */ jsxRuntime.jsx("span", { style: nameStyle, children: name }),
      children
    ] });
    if (href) {
      const { ...anchorProps } = props;
      return /* @__PURE__ */ jsxRuntime.jsx("a", { ref, href, style: brandStyle, ...anchorProps, children: content });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: brandStyle, ...props, children: content });
  }
);
NavbarBrand.displayName = "NavbarBrand";
var NavbarTitle = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const titleStyle = {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      margin: 0,
      fontSize: NAVBAR_TOKENS.title.fontSize,
      fontWeight: NAVBAR_TOKENS.title.fontWeight,
      color: NAVBAR_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      whiteSpace: "nowrap",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("h1", { ref, style: titleStyle, ...props, children });
  }
);
NavbarTitle.displayName = "NavbarTitle";
var NavbarActions = React2.forwardRef(
  ({ align = "right", style, children, ...props }, ref) => {
    const actionsStyle = {
      display: "flex",
      alignItems: "center",
      gap: 4,
      ...align === "left" && { marginRight: "auto" },
      ...align === "right" && { marginLeft: "auto" },
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: actionsStyle, ...props, children });
  }
);
NavbarActions.displayName = "NavbarActions";
var NavbarButton = React2.forwardRef(
  ({ icon: Icon2, badge, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const buttonStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: NAVBAR_TOKENS.action.size,
      height: NAVBAR_TOKENS.action.size,
      padding: 0,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 8,
      color: isHovered ? NAVBAR_TOKENS.action.colorHover : NAVBAR_TOKENS.action.color,
      cursor: "pointer",
      transition: "color 150ms, background-color 150ms",
      ...isHovered && { backgroundColor: "#f4f4f5" },
      ...style
    };
    const badgeStyle = {
      position: "absolute",
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      backgroundColor: "#ef4444",
      borderRadius: "50%",
      border: "2px solid white"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          Icon2 ? /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 20 }) : children,
          badge && /* @__PURE__ */ jsxRuntime.jsx("span", { style: badgeStyle })
        ]
      }
    );
  }
);
NavbarButton.displayName = "NavbarButton";
var NavbarBack = React2.forwardRef(
  ({ label = "Back", style, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const backStyle = {
      display: "flex",
      alignItems: "center",
      gap: 2,
      padding: "8px 8px 8px 0",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 8,
      color: NAVBAR_TOKENS.back.color,
      fontSize: NAVBAR_TOKENS.back.fontSize,
      fontWeight: NAVBAR_TOKENS.back.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: "pointer",
      transition: "opacity 150ms",
      opacity: isHovered ? 0.7 : 1,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        style: backStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 20 }),
          label
        ]
      }
    );
  }
);
NavbarBack.displayName = "NavbarBack";
var NavbarDivider = React2.forwardRef(
  ({ style, ...props }, ref) => {
    const dividerStyle = {
      width: NAVBAR_TOKENS.divider.width,
      height: NAVBAR_TOKENS.divider.height,
      backgroundColor: NAVBAR_TOKENS.divider.color,
      margin: `0 ${NAVBAR_TOKENS.divider.marginX}px`,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: dividerStyle, ...props });
  }
);
NavbarDivider.displayName = "NavbarDivider";
var NavbarToolsButton = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: NAVBAR_TOKENS.toolsButton.height,
      padding: `0 ${NAVBAR_TOKENS.toolsButton.paddingX}px`,
      backgroundColor: isHovered ? "rgba(124, 58, 237, 0.05)" : "transparent",
      border: `1.5px ${NAVBAR_TOKENS.toolsButton.borderStyle} ${NAVBAR_TOKENS.toolsButton.border}`,
      borderRadius: NAVBAR_TOKENS.toolsButton.radius,
      color: NAVBAR_TOKENS.toolsButton.color,
      fontSize: NAVBAR_TOKENS.toolsButton.fontSize,
      fontWeight: NAVBAR_TOKENS.toolsButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: "pointer",
      transition: "all 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
NavbarToolsButton.displayName = "NavbarToolsButton";
var NavbarSecondaryButton = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: NAVBAR_TOKENS.secondaryButton.height,
      padding: `0 ${NAVBAR_TOKENS.secondaryButton.paddingX}px`,
      backgroundColor: "transparent",
      border: "none",
      color: NAVBAR_TOKENS.secondaryButton.color,
      fontSize: NAVBAR_TOKENS.secondaryButton.fontSize,
      fontWeight: NAVBAR_TOKENS.secondaryButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: "pointer",
      transition: "opacity 150ms ease",
      opacity: isHovered ? 0.7 : 1,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
NavbarSecondaryButton.displayName = "NavbarSecondaryButton";
var NavbarPrimaryButton = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: NAVBAR_TOKENS.primaryButton.height,
      padding: `0 ${NAVBAR_TOKENS.primaryButton.paddingX}px`,
      backgroundColor: isHovered ? "#1a42c7" : NAVBAR_TOKENS.primaryButton.bg,
      border: "none",
      borderRadius: NAVBAR_TOKENS.primaryButton.radius,
      color: NAVBAR_TOKENS.primaryButton.color,
      fontSize: NAVBAR_TOKENS.primaryButton.fontSize,
      fontWeight: NAVBAR_TOKENS.primaryButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: "pointer",
      transition: "background-color 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
NavbarPrimaryButton.displayName = "NavbarPrimaryButton";
var NavbarLeft = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const leftStyle = {
      display: "flex",
      alignItems: "center",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: leftStyle, ...props, children });
  }
);
NavbarLeft.displayName = "NavbarLeft";
var BOTTOM_NAV_TOKENS = {
  // Container
  height: 64,
  bg: "#ffffff",
  border: "#e4e4e7",
  // Item
  item: {
    minWidth: 64,
    paddingY: 8,
    gap: 4,
    // Icon
    iconSize: 24,
    iconContainerSize: 32,
    // Colors
    fg: "#71717a",
    // Gray for inactive
    fgActive: "#2050f6",
    // Blue for active
    // Active pill
    activePillBg: "#f4f4f5",
    // Light gray pill
    activePillRadius: 16,
    activePillPaddingX: 20,
    activePillPaddingY: 4,
    // Label
    fontSize: 12,
    fontWeight: 500,
    // Badge
    badgeSize: 16,
    badgeBg: "#ef4444",
    badgeColor: "#ffffff"
  }
};
var BottomNavContext = React2.createContext(null);
function useBottomNav() {
  const context = React2.useContext(BottomNavContext);
  if (!context) {
    throw new Error("BottomNav components must be used within a BottomNav");
  }
  return context;
}
var BottomNav = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    fixed = true,
    showLabels = true,
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleValueChange = (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    const navStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: BOTTOM_NAV_TOKENS.height,
      padding: "8px 16px",
      backgroundColor: BOTTOM_NAV_TOKENS.bg,
      borderTop: `1px solid ${BOTTOM_NAV_TOKENS.border}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...fixed && {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40
      },
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(BottomNavContext.Provider, { value: { value, onValueChange: handleValueChange, showLabels }, children: /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, role: "navigation", style: navStyle, ...props, children }) });
  }
);
BottomNav.displayName = "BottomNav";
var BottomNavItem = React2.forwardRef(
  ({
    value: itemValue,
    icon: Icon2,
    activeIcon: ActiveIcon,
    label,
    badge,
    hideLabel,
    style,
    ...props
  }, ref) => {
    const { value, onValueChange, showLabels } = useBottomNav();
    const [isHovered, setIsHovered] = React2.useState(false);
    const isActive = value === itemValue;
    const IconComponent = isActive && ActiveIcon ? ActiveIcon : Icon2;
    const shouldShowLabel = hideLabel === void 0 ? showLabels : !hideLabel;
    const itemStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: BOTTOM_NAV_TOKENS.item.minWidth,
      padding: `${BOTTOM_NAV_TOKENS.item.paddingY}px 12px`,
      gap: BOTTOM_NAV_TOKENS.item.gap,
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      transition: "all 150ms ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    };
    const pillStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: BOTTOM_NAV_TOKENS.item.gap,
      padding: `${BOTTOM_NAV_TOKENS.item.activePillPaddingY}px ${BOTTOM_NAV_TOKENS.item.activePillPaddingX}px`,
      borderRadius: BOTTOM_NAV_TOKENS.item.activePillRadius,
      backgroundColor: isActive ? BOTTOM_NAV_TOKENS.item.activePillBg : isHovered ? "rgba(0,0,0,0.04)" : "transparent",
      transition: "background-color 200ms ease"
    };
    const iconContainerStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "auto",
      height: "auto",
      borderRadius: "none",
      border: "none",
      backgroundColor: "transparent",
      color: isActive ? BOTTOM_NAV_TOKENS.item.fgActive : BOTTOM_NAV_TOKENS.item.fg,
      transition: "color 150ms ease"
    };
    const labelStyle = {
      fontSize: BOTTOM_NAV_TOKENS.item.fontSize,
      fontWeight: BOTTOM_NAV_TOKENS.item.fontWeight,
      color: isActive ? BOTTOM_NAV_TOKENS.item.fgActive : BOTTOM_NAV_TOKENS.item.fg,
      transition: "color 150ms ease",
      lineHeight: 1
    };
    const badgeStyle = {
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: BOTTOM_NAV_TOKENS.item.badgeSize,
      height: BOTTOM_NAV_TOKENS.item.badgeSize,
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: BOTTOM_NAV_TOKENS.item.badgeBg,
      color: BOTTOM_NAV_TOKENS.item.badgeColor,
      fontSize: 9,
      fontWeight: 600,
      borderRadius: 9999
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        role: "tab",
        "aria-selected": isActive,
        style: itemStyle,
        onClick: () => onValueChange(itemValue),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { style: pillStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: iconContainerStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { size: BOTTOM_NAV_TOKENS.item.iconSize }),
            badge !== void 0 && badge > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { style: badgeStyle, children: badge > 99 ? "99+" : badge })
          ] }),
          shouldShowLabel && /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label })
        ] })
      }
    );
  }
);
BottomNavItem.displayName = "BottomNavItem";
var BottomNavSearch = React2.forwardRef(
  ({ icon: Icon2, onPress, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2.useState(false);
    const [isPressed, setIsPressed] = React2.useState(false);
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: isPressed ? "#e4e4e7" : isHovered ? "#f4f4f5" : "transparent",
      border: "none",
      cursor: "pointer",
      color: "#71717a",
      transition: "all 150ms ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    };
    const SearchIcon = () => /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
    ] });
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        style: buttonStyle,
        onClick: onPress,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onMouseDown: () => setIsPressed(true),
        onMouseUp: () => setIsPressed(false),
        ...props,
        children: Icon2 ? /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 24 }) : /* @__PURE__ */ jsxRuntime.jsx(SearchIcon, {})
      }
    );
  }
);
BottomNavSearch.displayName = "BottomNavSearch";
var SIDE_NAV_TOKENS = {
  // Container
  width: 256,
  widthCollapsed: 72,
  bg: "#ffffff",
  borderColor: "#e4e4e7",
  padding: 12,
  // Header
  header: {
    height: 56,
    gap: 12
  },
  // Item
  item: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    fontWeight: 500,
    radius: 8,
    iconSize: 20,
    gap: 12,
    // States
    fg: "#3f3f46",
    fgActive: "#2050f6",
    fgHover: "#18181b",
    bg: "transparent",
    bgHover: "#f4f4f5",
    bgActive: "#eef4ff"
  },
  // Group
  group: {
    labelSize: 12,
    labelWeight: 500,
    labelColor: "#71717a",
    paddingTop: 16,
    paddingBottom: 8,
    paddingX: 12
  },
  // User profile
  user: {
    avatarSize: 36,
    avatarRadius: 8,
    nameSize: 14,
    nameWeight: 500,
    nameColor: "#18181b",
    emailSize: 12,
    emailColor: "#71717a"
  }
};
var SideNavContext = React2.createContext(null);
function useSideNav() {
  const context = React2.useContext(SideNavContext);
  if (!context) {
    throw new Error("SideNav components must be used within a SideNav");
  }
  return context;
}
var SideNav = React2.forwardRef(
  ({
    collapsed: controlledCollapsed,
    onCollapsedChange,
    activeItem: controlledActive,
    defaultActiveItem = "",
    onActiveItemChange,
    style,
    children,
    ...props
  }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = React2.useState(false);
    const [internalActive, setInternalActive] = React2.useState(defaultActiveItem);
    const isCollapsedControlled = controlledCollapsed !== void 0;
    const collapsed = isCollapsedControlled ? controlledCollapsed : internalCollapsed;
    const isActiveControlled = controlledActive !== void 0;
    const activeItem = isActiveControlled ? controlledActive : internalActive;
    const setActiveItem = (item) => {
      if (!isActiveControlled) {
        setInternalActive(item);
      }
      onActiveItemChange?.(item);
    };
    const navStyle = {
      width: collapsed ? SIDE_NAV_TOKENS.widthCollapsed : SIDE_NAV_TOKENS.width,
      height: "100%",
      backgroundColor: SIDE_NAV_TOKENS.bg,
      borderRight: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
      padding: SIDE_NAV_TOKENS.padding,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: "width 200ms ease",
      overflow: "hidden",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(SideNavContext.Provider, { value: { collapsed, activeItem, setActiveItem }, children: /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, style: navStyle, ...props, children }) });
  }
);
SideNav.displayName = "SideNav";
var SideNavHeader = React2.forwardRef(
  ({ logo, title, subtitle, showCollapseButton = true, onCollapse, style, children, ...props }, ref) => {
    const { collapsed } = useSideNav();
    const headerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "space-between",
      height: SIDE_NAV_TOKENS.header.height,
      padding: `0 ${SIDE_NAV_TOKENS.item.paddingX}px`,
      marginBottom: 8,
      ...style
    };
    const logoContainerStyle = {
      display: "flex",
      alignItems: "center",
      gap: SIDE_NAV_TOKENS.header.gap,
      overflow: "hidden"
    };
    const titleContainerStyle = {
      display: collapsed ? "none" : "flex",
      flexDirection: "column",
      overflow: "hidden"
    };
    const titleStyle = {
      fontSize: 14,
      fontWeight: 600,
      color: "#18181b",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const subtitleStyle = {
      fontSize: 12,
      color: "#71717a",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const collapseButtonStyle = {
      display: collapsed ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      color: "#71717a",
      flexShrink: 0
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: headerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: logoContainerStyle, children: [
        logo,
        (title || subtitle) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: titleContainerStyle, children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("span", { style: titleStyle, children: title }),
          subtitle && /* @__PURE__ */ jsxRuntime.jsx("span", { style: subtitleStyle, children: subtitle })
        ] })
      ] }),
      showCollapseButton && !collapsed && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: collapseButtonStyle, onClick: onCollapse, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PanelLeftClose, { size: 18 }) }),
      children
    ] });
  }
);
SideNavHeader.displayName = "SideNavHeader";
var SideNavContent = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        style: {
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          ...style
        },
        ...props,
        children
      }
    );
  }
);
SideNavContent.displayName = "SideNavContent";
var SideNavGroup = React2.forwardRef(
  ({ label, style, children, ...props }, ref) => {
    const { collapsed } = useSideNav();
    const groupStyle = {
      paddingTop: SIDE_NAV_TOKENS.group.paddingTop,
      ...style
    };
    const labelStyle = {
      display: collapsed ? "none" : "block",
      padding: `${SIDE_NAV_TOKENS.group.paddingBottom}px ${SIDE_NAV_TOKENS.group.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.group.labelSize,
      fontWeight: SIDE_NAV_TOKENS.group.labelWeight,
      color: SIDE_NAV_TOKENS.group.labelColor
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: groupStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("div", { style: labelStyle, children: label }),
      children
    ] });
  }
);
SideNavGroup.displayName = "SideNavGroup";
var SideNavItem = React2.forwardRef(
  ({ value, icon: Icon2, label, hasSubmenu, badge, disabled = false, href, style, onClick, ...props }, ref) => {
    const { collapsed, activeItem, setActiveItem } = useSideNav();
    const [isHovered, setIsHovered] = React2.useState(false);
    const isActive = activeItem === value;
    const handleClick = (e) => {
      if (disabled) return;
      setActiveItem(value);
      onClick?.(e);
    };
    const itemStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "flex-start",
      gap: SIDE_NAV_TOKENS.item.gap,
      width: "100%",
      height: SIDE_NAV_TOKENS.item.height,
      padding: collapsed ? "0" : `0 ${SIDE_NAV_TOKENS.item.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.item.fontSize,
      fontWeight: SIDE_NAV_TOKENS.item.fontWeight,
      fontFamily: "inherit",
      color: isActive ? SIDE_NAV_TOKENS.item.fgActive : isHovered ? SIDE_NAV_TOKENS.item.fgHover : SIDE_NAV_TOKENS.item.fg,
      backgroundColor: isActive ? SIDE_NAV_TOKENS.item.bgActive : isHovered && !disabled ? SIDE_NAV_TOKENS.item.bgHover : SIDE_NAV_TOKENS.item.bg,
      border: "none",
      borderRadius: SIDE_NAV_TOKENS.item.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      textDecoration: "none",
      textAlign: "left",
      transition: "all 150ms ease",
      ...style
    };
    const iconWrapperStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: SIDE_NAV_TOKENS.item.iconSize,
      height: SIDE_NAV_TOKENS.item.iconSize,
      borderRadius: "50%",
      border: isActive ? "none" : `1.5px solid ${isActive ? SIDE_NAV_TOKENS.item.fgActive : SIDE_NAV_TOKENS.item.fg}`,
      backgroundColor: isActive ? SIDE_NAV_TOKENS.item.fgActive : "transparent",
      color: isActive ? "#ffffff" : "inherit",
      flexShrink: 0
    };
    const badgeStyle = {
      marginLeft: "auto",
      padding: "2px 6px",
      fontSize: 11,
      fontWeight: 600,
      color: "#ffffff",
      backgroundColor: "#2050f6",
      borderRadius: 10
    };
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      Icon2 ? /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 16, style: { flexShrink: 0 } }) : /* @__PURE__ */ jsxRuntime.jsx("span", { style: iconWrapperStyle, children: isActive && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ffffff" } }) }),
      !collapsed && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label }),
        badge !== void 0 && badge > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { style: badgeStyle, children: badge > 99 ? "99+" : badge }),
        hasSubmenu && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 16, style: { color: "#a1a1aa", flexShrink: 0 } })
      ] })
    ] });
    if (href && !disabled) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          href,
          style: itemStyle,
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        style: itemStyle,
        onClick: handleClick,
        disabled,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: content
      }
    );
  }
);
SideNavItem.displayName = "SideNavItem";
var SideNavFooter = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        style: {
          marginTop: "auto",
          paddingTop: 12,
          borderTop: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
          ...style
        },
        ...props,
        children
      }
    );
  }
);
SideNavFooter.displayName = "SideNavFooter";
var SideNavUser = React2.forwardRef(
  ({ avatar, name, email, showExpand = false, style, onClick, ...props }, ref) => {
    const { collapsed } = useSideNav();
    const [isHovered, setIsHovered] = React2.useState(false);
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "flex-start",
      gap: 12,
      padding: collapsed ? "8px 0" : "8px 12px",
      borderRadius: 8,
      cursor: onClick ? "pointer" : "default",
      backgroundColor: isHovered && onClick ? "#f4f4f5" : "transparent",
      transition: "background-color 150ms ease",
      ...style
    };
    const avatarStyle = {
      width: SIDE_NAV_TOKENS.user.avatarSize,
      height: SIDE_NAV_TOKENS.user.avatarSize,
      borderRadius: SIDE_NAV_TOKENS.user.avatarRadius,
      backgroundColor: "#2050f6",
      color: "#ffffff",
      fontSize: 12,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      overflow: "hidden"
    };
    const infoStyle = {
      display: collapsed ? "none" : "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "hidden"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        style: containerStyle,
        onClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: avatarStyle, children: avatar ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: avatar, alt: name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : initials }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: infoStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
              fontSize: SIDE_NAV_TOKENS.user.nameSize,
              fontWeight: SIDE_NAV_TOKENS.user.nameWeight,
              color: SIDE_NAV_TOKENS.user.nameColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: name }),
            email && /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
              fontSize: SIDE_NAV_TOKENS.user.emailSize,
              color: SIDE_NAV_TOKENS.user.emailColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: email })
          ] }),
          !collapsed && showExpand && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 16, style: { color: "#a1a1aa", flexShrink: 0 } })
        ]
      }
    );
  }
);
SideNavUser.displayName = "SideNavUser";
var SideNavDivider = React2.forwardRef(
  ({ style, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "hr",
      {
        ref,
        style: {
          margin: "8px 0",
          border: "none",
          borderTop: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
          ...style
        },
        ...props
      }
    );
  }
);
SideNavDivider.displayName = "SideNavDivider";
var CARD_TOKENS = {
  // Colors
  bg: "#ffffff",
  border: "#e4e4e7",
  // zinc-200
  // Radius
  radius: 8,
  // radius.2
  // Shadows
  shadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.04)",
  // shadow-level-1
  // Spacing
  padding: {
    sm: 16,
    md: 20,
    lg: 24
  },
  // Sizes (based on Figma)
  sizes: {
    sm: { minHeight: 178 },
    md: { minHeight: 192 },
    lg: { minHeight: 216 }
  }
};
var Card = React2.forwardRef(
  ({ size = "md", flat = false, hoverable = false, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const cardStyle = {
      backgroundColor: CARD_TOKENS.bg,
      border: `1px solid ${CARD_TOKENS.border}`,
      borderRadius: CARD_TOKENS.radius,
      boxShadow: flat ? "none" : isHovered && hoverable ? "0px 0px 24px 0px rgba(0, 0, 0, 0.1)" : CARD_TOKENS.shadow,
      padding: CARD_TOKENS.padding[size],
      minHeight: CARD_TOKENS.sizes[size].minHeight,
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow 200ms ease-in-out",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        style: cardStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = React2.forwardRef(
  ({ rightContent, style, children, ...props }, ref) => {
    const headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
      marginBottom: 12,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: headerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: { flex: 1 }, children }),
      rightContent && /* @__PURE__ */ jsxRuntime.jsx("div", { children: rightContent })
    ] });
  }
);
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(
  ({ as: Component = "h3", style, children, ...props }, ref) => {
    const titleStyle = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#09090b",
      // zinc-950
      margin: 0,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, style: titleStyle, ...props, children });
  }
);
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const descStyle = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#71717a",
      // zinc-500
      margin: "4px 0 0 0",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, style: descStyle, ...props, children });
  }
);
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const contentStyle = {
      flex: 1,
      marginTop: 16,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: contentStyle, ...props, children });
  }
);
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(
  ({ align = "left", style, children, ...props }, ref) => {
    const justifyMap = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
      between: "space-between"
    };
    const footerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: justifyMap[align],
      gap: 12,
      marginTop: 16,
      paddingTop: 16,
      borderTop: `1px solid ${CARD_TOKENS.border}`,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: footerStyle, ...props, children });
  }
);
CardFooter.displayName = "CardFooter";
var DIVIDER_TOKENS = {
  color: "#e4e4e7",
  // zinc-200
  thickness: 1,
  spacing: {
    sm: 8,
    md: 16,
    lg: 24
  }
};
var Divider = React2.forwardRef(
  ({
    orientation = "horizontal",
    spacing = "md",
    color,
    style,
    ...props
  }, ref) => {
    const spacingValue = spacing === "none" ? 0 : DIVIDER_TOKENS.spacing[spacing];
    const dividerStyle = orientation === "horizontal" ? {
      width: "100%",
      height: DIVIDER_TOKENS.thickness,
      margin: `${spacingValue}px 0`,
      backgroundColor: color || DIVIDER_TOKENS.color,
      border: "none",
      ...style
    } : {
      width: DIVIDER_TOKENS.thickness,
      height: "100%",
      minHeight: 16,
      margin: `0 ${spacingValue}px`,
      backgroundColor: color || DIVIDER_TOKENS.color,
      border: "none",
      alignSelf: "stretch",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "hr",
      {
        ref,
        role: "separator",
        "aria-orientation": orientation,
        style: dividerStyle,
        ...props
      }
    );
  }
);
Divider.displayName = "Divider";
var DividerWithLabel = React2.forwardRef(
  ({
    label,
    labelPosition = "center",
    spacing = "md",
    color,
    style,
    ...props
  }, ref) => {
    const spacingValue = spacing === "none" ? 0 : DIVIDER_TOKENS.spacing[spacing];
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      margin: `${spacingValue}px 0`,
      ...style
    };
    const lineStyle = {
      flex: 1,
      height: DIVIDER_TOKENS.thickness,
      backgroundColor: color || DIVIDER_TOKENS.color
    };
    const labelStyle = {
      padding: "0 12px",
      fontSize: 12,
      fontWeight: 500,
      color: "#71717a",
      // zinc-500
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      whiteSpace: "nowrap"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role: "separator", style: containerStyle, ...props, children: [
      labelPosition !== "left" && /* @__PURE__ */ jsxRuntime.jsx("span", { style: lineStyle }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label }),
      labelPosition !== "right" && /* @__PURE__ */ jsxRuntime.jsx("span", { style: lineStyle })
    ] });
  }
);
DividerWithLabel.displayName = "DividerWithLabel";
var HEADER_TOKENS = {
  // Page Header
  page: {
    paddingY: 24,
    paddingX: 0
  },
  // Title
  title: {
    h1: { fontSize: 30, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: 24, fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
    color: "#18181b"
  },
  // Description
  description: {
    fontSize: 14,
    color: "#71717a",
    marginTop: 8
  },
  // Breadcrumb
  breadcrumb: {
    marginBottom: 16
  }
};
var PageHeader = React2.forwardRef(
  ({
    title,
    description,
    level = "h1",
    actions,
    breadcrumb,
    style,
    children,
    ...props
  }, ref) => {
    const containerStyle = {
      padding: `${HEADER_TOKENS.page.paddingY}px ${HEADER_TOKENS.page.paddingX}px`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const headerRowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16
    };
    const titleStyles = HEADER_TOKENS.title[level];
    const TitleTag = level;
    const titleStyle = {
      margin: 0,
      fontSize: titleStyles.fontSize,
      fontWeight: titleStyles.fontWeight,
      lineHeight: titleStyles.lineHeight,
      color: HEADER_TOKENS.title.color
    };
    const descriptionStyle = {
      margin: `${HEADER_TOKENS.description.marginTop}px 0 0`,
      fontSize: HEADER_TOKENS.description.fontSize,
      color: HEADER_TOKENS.description.color
    };
    const actionsStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      breadcrumb && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { marginBottom: HEADER_TOKENS.breadcrumb.marginBottom }, children: breadcrumb }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerRowStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(TitleTag, { style: titleStyle, children: title }),
          description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: description })
        ] }),
        actions && /* @__PURE__ */ jsxRuntime.jsx("div", { style: actionsStyle, children: actions })
      ] }),
      children
    ] });
  }
);
PageHeader.displayName = "PageHeader";
var SectionHeader = React2.forwardRef(
  ({ title, description, actions, bordered = false, style, ...props }, ref) => {
    const containerStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      paddingBottom: bordered ? 16 : 0,
      marginBottom: 16,
      borderBottom: bordered ? "1px solid #e4e4e7" : "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const titleStyle = {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      color: "#18181b"
    };
    const descriptionStyle = {
      margin: "4px 0 0",
      fontSize: 13,
      color: "#71717a"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { style: titleStyle, children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: description })
      ] }),
      actions && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: actions })
    ] });
  }
);
SectionHeader.displayName = "SectionHeader";
var CardHeaderTitle = React2.forwardRef(
  ({ title, subtitle, leading, trailing, style, ...props }, ref) => {
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const contentStyle = {
      flex: 1,
      minWidth: 0
    };
    const titleStyle = {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: "#18181b"
    };
    const subtitleStyle = {
      margin: "2px 0 0",
      fontSize: 13,
      color: "#71717a"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      leading,
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("h4", { style: titleStyle, children: title }),
        subtitle && /* @__PURE__ */ jsxRuntime.jsx("p", { style: subtitleStyle, children: subtitle })
      ] }),
      trailing
    ] });
  }
);
CardHeaderTitle.displayName = "CardHeaderTitle";
var FOOTER_ACTIONS_TOKENS = {
  // Container
  padding: 16,
  bg: "#ffffff",
  border: "#e4e4e7",
  // Gap (minimum 8px per Figma, but using 12px for better spacing)
  gap: 12,
  // Mobile: buttons should be full-width
  mobileGap: 8,
  // Minimum button height for touch accessibility
  minButtonHeight: 44
};
var FooterActions = React2.forwardRef(
  ({
    fixed = false,
    bordered = true,
    align = "right",
    direction,
    gap,
    mobile = false,
    role = "region",
    "aria-label": ariaLabel = "Form Actions",
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = mobile || direction === "vertical";
    const finalDirection = direction || (isMobile ? "vertical" : "horizontal");
    const finalGap = gap ?? (isMobile ? FOOTER_ACTIONS_TOKENS.mobileGap : FOOTER_ACTIONS_TOKENS.gap);
    const getJustifyContent = () => {
      if (finalDirection === "vertical") {
        return "flex-start";
      }
      switch (align) {
        case "left":
          return "flex-start";
        case "center":
          return "center";
        case "right":
          return "flex-end";
        case "space-between":
          return "space-between";
        default:
          return "flex-end";
      }
    };
    const containerStyle = {
      display: "flex",
      flexDirection: finalDirection === "vertical" ? "column" : "row",
      alignItems: finalDirection === "vertical" ? "stretch" : "center",
      justifyContent: getJustifyContent(),
      gap: finalGap,
      padding: FOOTER_ACTIONS_TOKENS.padding,
      backgroundColor: FOOTER_ACTIONS_TOKENS.bg,
      borderTop: bordered ? `1px solid ${FOOTER_ACTIONS_TOKENS.border}` : "none",
      ...fixed && {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40
      },
      ...style
    };
    const childrenWithProps = React2__namespace.Children.map(children, (child) => {
      if (React2__namespace.isValidElement(child) && isMobile) {
        const childProps = child.props;
        return React2__namespace.cloneElement(child, {
          style: {
            width: "100%",
            minHeight: FOOTER_ACTIONS_TOKENS.minButtonHeight,
            ...childProps.style || {}
          }
        });
      }
      return child;
    });
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role,
        "aria-label": ariaLabel,
        style: containerStyle,
        ...props,
        children: childrenWithProps
      }
    );
  }
);
FooterActions.displayName = "FooterActions";
var PageFooter = React2.forwardRef(
  ({ variant = "light", style, children, ...props }, ref) => {
    const isDark = variant === "dark";
    const footerStyle = {
      backgroundColor: isDark ? "#18181b" : "#fafafa",
      color: isDark ? "#fafafa" : "#18181b",
      padding: "48px 24px 24px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("footer", { ref, style: footerStyle, ...props, children });
  }
);
PageFooter.displayName = "PageFooter";
var FooterSection = React2.forwardRef(
  ({ title, style, children, ...props }, ref) => {
    const sectionStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      ...style
    };
    const titleStyle = {
      margin: "0 0 8px",
      fontSize: 14,
      fontWeight: 600
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: sectionStyle, ...props, children: [
      title && /* @__PURE__ */ jsxRuntime.jsx("h4", { style: titleStyle, children: title }),
      children
    ] });
  }
);
FooterSection.displayName = "FooterSection";
var FooterLink = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const linkStyle = {
      fontSize: 14,
      color: isHovered ? "#2050f6" : "#71717a",
      textDecoration: "none",
      transition: "color 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        style: linkStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
FooterLink.displayName = "FooterLink";
var FooterCopyright = React2.forwardRef(
  ({ name = "Company", year = (/* @__PURE__ */ new Date()).getFullYear(), style, children, ...props }, ref) => {
    const copyrightStyle = {
      margin: 0,
      fontSize: 13,
      color: "#71717a",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, style: copyrightStyle, ...props, children: children || `\xA9 ${year} ${name}. All rights reserved.` });
  }
);
FooterCopyright.displayName = "FooterCopyright";
var DATA_BLOCK_TOKENS = {
  // Container
  padding: 16,
  radius: 12,
  bg: "#ffffff",
  border: "#e4e4e7",
  // Label
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#71717a"
  },
  // Value
  value: {
    fontSize: 28,
    fontWeight: 600,
    color: "#18181b"
  },
  // Trend
  trend: {
    fontSize: 13,
    fontWeight: 500,
    positive: "#16a34a",
    negative: "#dc2626",
    neutral: "#71717a"
  },
  // Icon
  icon: {
    size: 40,
    bg: "#f4f4f5",
    radius: 8
  }
};
var DataBlock = React2.forwardRef(
  ({
    label,
    value,
    trend,
    trendLabel,
    icon: Icon2,
    iconBg = DATA_BLOCK_TOKENS.icon.bg,
    iconColor = "#3f3f46",
    size = "md",
    loading = false,
    style,
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: { padding: 12, valueSize: 22, iconSize: 32 },
      md: { padding: 16, valueSize: 28, iconSize: 40 },
      lg: { padding: 20, valueSize: 36, iconSize: 48 }
    };
    const currentSize = sizeStyles[size];
    const getTrendColor = () => {
      if (!trend || trend === 0) return DATA_BLOCK_TOKENS.trend.neutral;
      return trend > 0 ? DATA_BLOCK_TOKENS.trend.positive : DATA_BLOCK_TOKENS.trend.negative;
    };
    const TrendIcon = !trend || trend === 0 ? lucideReact.Minus : trend > 0 ? lucideReact.TrendingUp : lucideReact.TrendingDown;
    const containerStyle = {
      padding: currentSize.padding,
      backgroundColor: DATA_BLOCK_TOKENS.bg,
      border: `1px solid ${DATA_BLOCK_TOKENS.border}`,
      borderRadius: DATA_BLOCK_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const headerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8
    };
    const iconContainerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: currentSize.iconSize,
      height: currentSize.iconSize,
      backgroundColor: iconBg,
      borderRadius: DATA_BLOCK_TOKENS.icon.radius,
      color: iconColor,
      flexShrink: 0
    };
    const labelStyle = {
      fontSize: DATA_BLOCK_TOKENS.label.fontSize,
      fontWeight: DATA_BLOCK_TOKENS.label.fontWeight,
      color: DATA_BLOCK_TOKENS.label.color,
      margin: 0
    };
    const valueStyle = {
      fontSize: currentSize.valueSize,
      fontWeight: DATA_BLOCK_TOKENS.value.fontWeight,
      color: DATA_BLOCK_TOKENS.value.color,
      margin: 0,
      lineHeight: 1.2
    };
    const trendStyle = {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 8,
      fontSize: DATA_BLOCK_TOKENS.trend.fontSize,
      fontWeight: DATA_BLOCK_TOKENS.trend.fontWeight,
      color: getTrendColor()
    };
    const skeletonStyle = {
      backgroundColor: "#e4e4e7",
      borderRadius: 4,
      animation: "pulse 1.5s infinite"
    };
    if (loading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: { ...skeletonStyle, width: 80, height: 16 } }),
          Icon2 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { ...skeletonStyle, width: currentSize.iconSize, height: currentSize.iconSize, borderRadius: 8 } })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { ...skeletonStyle, width: 120, height: currentSize.valueSize } }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { ...skeletonStyle, width: 60, height: 16, marginTop: 8 } })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerStyle, children: [
        Icon2 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: iconContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: Math.max(16, currentSize.iconSize * 0.4) }) }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { style: labelStyle, children: label })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { style: valueStyle, children: value }),
      (trend !== void 0 || trendLabel) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: trendStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx(TrendIcon, { size: 14 }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          trend !== void 0 && `${trend > 0 ? "+" : ""}${trend}%`,
          trendLabel && ` ${trendLabel}`
        ] })
      ] })
    ] });
  }
);
DataBlock.displayName = "DataBlock";
var DataBlockGrid = React2.forwardRef(
  ({ columns = 3, gap = 16, style, children, ...props }, ref) => {
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: gridStyle, ...props, children });
  }
);
DataBlockGrid.displayName = "DataBlockGrid";
var TABLE_TOKENS = {
  // Container
  bg: "#ffffff",
  border: "#e4e4e7",
  radius: 8,
  // Header
  header: {
    bg: "#fafafa",
    fg: "#71717a",
    fontSize: 12,
    fontWeight: 600,
    paddingX: 16,
    paddingY: 12
  },
  // Cell
  cell: {
    fg: "#18181b",
    fontSize: 14,
    paddingX: 16,
    paddingY: 12
  },
  // Row
  row: {
    borderColor: "#e4e4e7",
    bgHover: "#fafafa",
    bgSelected: "#eef4ff"
  },
  // Pagination
  pagination: {
    fontSize: 14,
    fg: "#18181b",
    buttonSize: 32,
    buttonRadius: 6,
    buttonBg: "transparent",
    buttonBgHover: "#f4f4f5",
    buttonFg: "#71717a",
    buttonFgActive: "#2050f6",
    buttonFgDisabled: "#d4d4d8"
  }
};
var Table = React2.forwardRef(
  ({ striped = false, bordered = true, style, children, ...props }, ref) => {
    const wrapperStyle = {
      width: "100%",
      overflow: "auto",
      border: bordered ? `1px solid ${TABLE_TOKENS.border}` : "none",
      borderRadius: TABLE_TOKENS.radius,
      backgroundColor: TABLE_TOKENS.bg
    };
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { style: wrapperStyle, children: /* @__PURE__ */ jsxRuntime.jsx("table", { ref, style: tableStyle, ...props, children }) });
  }
);
Table.displayName = "Table";
var TableHeader = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const headerStyle = {
      backgroundColor: TABLE_TOKENS.header.bg,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("thead", { ref, style: headerStyle, ...props, children });
  }
);
TableHeader.displayName = "TableHeader";
var TableBody = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx("tbody", { ref, style, ...props, children });
  }
);
TableBody.displayName = "TableBody";
var TableRow = React2.forwardRef(
  ({ selected = false, clickable = false, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const rowStyle = {
      borderBottom: `1px solid ${TABLE_TOKENS.row.borderColor}`,
      backgroundColor: selected ? TABLE_TOKENS.row.bgSelected : isHovered && clickable ? TABLE_TOKENS.row.bgHover : "transparent",
      cursor: clickable ? "pointer" : "default",
      transition: "background-color 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tr",
      {
        ref,
        style: rowStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
TableRow.displayName = "TableRow";
var TableHead = React2.forwardRef(
  ({ sortDirection, sortable = false, style, children, onClick, ...props }, ref) => {
    const thStyle = {
      padding: `${TABLE_TOKENS.header.paddingY}px ${TABLE_TOKENS.header.paddingX}px`,
      textAlign: "left",
      fontSize: TABLE_TOKENS.header.fontSize,
      fontWeight: TABLE_TOKENS.header.fontWeight,
      color: TABLE_TOKENS.header.fg,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      cursor: sortable ? "pointer" : "default",
      userSelect: sortable ? "none" : "auto",
      ...style
    };
    const sortIconStyle = {
      display: "inline-flex",
      marginLeft: 4,
      opacity: sortDirection ? 1 : 0.3
    };
    return /* @__PURE__ */ jsxRuntime.jsx("th", { ref, style: thStyle, onClick: sortable ? onClick : void 0, ...props, children: /* @__PURE__ */ jsxRuntime.jsxs("span", { style: { display: "inline-flex", alignItems: "center" }, children: [
      children,
      sortable && /* @__PURE__ */ jsxRuntime.jsx("span", { style: sortIconStyle, children: sortDirection === "asc" ? "\u2191" : sortDirection === "desc" ? "\u2193" : "\u2195" })
    ] }) });
  }
);
TableHead.displayName = "TableHead";
var TableCell = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const cellStyle = {
      padding: `${TABLE_TOKENS.cell.paddingY}px ${TABLE_TOKENS.cell.paddingX}px`,
      fontSize: TABLE_TOKENS.cell.fontSize,
      color: TABLE_TOKENS.cell.fg,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("td", { ref, style: cellStyle, ...props, children });
  }
);
TableCell.displayName = "TableCell";
var TableFooter = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const footerStyle = {
      backgroundColor: TABLE_TOKENS.header.bg,
      fontWeight: 500,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("tfoot", { ref, style: footerStyle, ...props, children });
  }
);
TableFooter.displayName = "TableFooter";
var TableCaption = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const captionStyle = {
      padding: `${TABLE_TOKENS.cell.paddingY}px ${TABLE_TOKENS.cell.paddingX}px`,
      fontSize: 13,
      color: "#71717a",
      textAlign: "left",
      captionSide: "bottom",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("caption", { ref, style: captionStyle, ...props, children });
  }
);
TableCaption.displayName = "TableCaption";
var TablePagination = ({
  page,
  total,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, total);
  const handleFirstPage = () => {
    if (page > 1) onPageChange(1);
  };
  const handlePrevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };
  const handleLastPage = () => {
    if (page < totalPages) onPageChange(totalPages);
  };
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderTop: `1px solid ${TABLE_TOKENS.border}`,
    backgroundColor: TABLE_TOKENS.bg,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };
  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8
  };
  const labelStyle = {
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    whiteSpace: "nowrap"
  };
  const selectStyle = {
    padding: "4px 8px",
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    border: `1px solid ${TABLE_TOKENS.border}`,
    borderRadius: 6,
    backgroundColor: TABLE_TOKENS.bg,
    cursor: "pointer"
  };
  const statusStyle = {
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    marginLeft: 16
  };
  const buttonStyle = (disabled, active = false) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: TABLE_TOKENS.pagination.buttonSize,
    height: TABLE_TOKENS.pagination.buttonSize,
    borderRadius: TABLE_TOKENS.pagination.buttonRadius,
    backgroundColor: TABLE_TOKENS.pagination.buttonBg,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? TABLE_TOKENS.pagination.buttonFgDisabled : active ? TABLE_TOKENS.pagination.buttonFgActive : TABLE_TOKENS.pagination.buttonFg,
    transition: "all 150ms ease"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: leftSectionStyle, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: "Rows per page" }),
      onRowsPerPageChange && /* @__PURE__ */ jsxRuntime.jsx(
        "select",
        {
          value: rowsPerPage,
          onChange: (e) => onRowsPerPageChange(Number(e.target.value)),
          style: selectStyle,
          children: rowsPerPageOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: option, children: option }, option))
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { style: statusStyle, children: [
        start,
        "-",
        end,
        " of ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          style: buttonStyle(page === 1),
          onClick: handleFirstPage,
          disabled: page === 1,
          "aria-label": "First page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          style: buttonStyle(page === 1),
          onClick: handlePrevPage,
          disabled: page === 1,
          "aria-label": "Previous page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          style: buttonStyle(page === totalPages),
          onClick: handleNextPage,
          disabled: page === totalPages,
          "aria-label": "Next page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          style: buttonStyle(page === totalPages),
          onClick: handleLastPage,
          disabled: page === totalPages,
          "aria-label": "Last page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { size: 16 })
        }
      )
    ] })
  ] });
};
TablePagination.displayName = "TablePagination";
var PAGINATION_TOKENS = {
  // Button
  button: {
    size: 36,
    fontSize: 14,
    fontWeight: 500,
    radius: 8,
    // States
    bg: "transparent",
    bgHover: "#f4f4f5",
    bgActive: "#2050f6",
    fg: "#3f3f46",
    fgHover: "#18181b",
    fgActive: "#ffffff",
    fgDisabled: "#a1a1aa"
  },
  gap: 4
};
var Pagination = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const navStyle = {
      display: "flex",
      alignItems: "center",
      gap: PAGINATION_TOKENS.gap,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, role: "navigation", "aria-label": "Pagination", style: navStyle, ...props, children });
  }
);
Pagination.displayName = "Pagination";
var PaginationButton = React2.forwardRef(
  ({ active = false, iconOnly = false, disabled, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const getColor = () => {
      if (disabled) return PAGINATION_TOKENS.button.fgDisabled;
      if (active) return PAGINATION_TOKENS.button.fgActive;
      if (isHovered) return PAGINATION_TOKENS.button.fgHover;
      return PAGINATION_TOKENS.button.fg;
    };
    const getBg = () => {
      if (active) return PAGINATION_TOKENS.button.bgActive;
      if (isHovered && !disabled) return PAGINATION_TOKENS.button.bgHover;
      return PAGINATION_TOKENS.button.bg;
    };
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: PAGINATION_TOKENS.button.size,
      height: PAGINATION_TOKENS.button.size,
      padding: iconOnly ? 0 : "0 12px",
      fontSize: PAGINATION_TOKENS.button.fontSize,
      fontWeight: PAGINATION_TOKENS.button.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: getBg(),
      border: "none",
      borderRadius: PAGINATION_TOKENS.button.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 150ms ease",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        disabled,
        "aria-current": active ? "page" : void 0,
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props,
        children
      }
    );
  }
);
PaginationButton.displayName = "PaginationButton";
var PaginationEllipsis = React2.forwardRef(
  ({ style, ...props }, ref) => {
    const ellipsisStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: PAGINATION_TOKENS.button.size,
      height: PAGINATION_TOKENS.button.size,
      color: PAGINATION_TOKENS.button.fgDisabled,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("span", { ref, style: ellipsisStyle, ...props, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { size: 16 }) });
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";
var FullPagination = React2.forwardRef(
  ({
    page,
    totalPages,
    onPageChange,
    showFirstLast = false,
    siblingCount = 1,
    style,
    ...props
  }, ref) => {
    const getPageNumbers = () => {
      const pages = [];
      pages.push(1);
      const leftSibling = Math.max(2, page - siblingCount);
      const rightSibling = Math.min(totalPages - 1, page + siblingCount);
      if (leftSibling > 2) {
        pages.push("ellipsis");
      }
      for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      if (rightSibling < totalPages - 1) {
        pages.push("ellipsis");
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      return pages;
    };
    const pageNumbers = getPageNumbers();
    return /* @__PURE__ */ jsxRuntime.jsxs(Pagination, { ref, style, ...props, children: [
      showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          iconOnly: true,
          disabled: page === 1,
          onClick: () => onPageChange(1),
          "aria-label": "First page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          iconOnly: true,
          disabled: page === 1,
          onClick: () => onPageChange(page - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 16 })
        }
      ),
      pageNumbers.map(
        (p, i) => p === "ellipsis" ? /* @__PURE__ */ jsxRuntime.jsx(PaginationEllipsis, {}, `ellipsis-${i}`) : /* @__PURE__ */ jsxRuntime.jsx(
          PaginationButton,
          {
            active: p === page,
            onClick: () => onPageChange(p),
            children: p
          },
          p
        )
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          iconOnly: true,
          disabled: page === totalPages,
          onClick: () => onPageChange(page + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 16 })
        }
      ),
      showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          iconOnly: true,
          disabled: page === totalPages,
          onClick: () => onPageChange(totalPages),
          "aria-label": "Last page",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { size: 16 })
        }
      )
    ] });
  }
);
FullPagination.displayName = "FullPagination";
var ITEM_TOKENS = {
  // Container
  minHeight: 48,
  // Minimum for mobile touch targets (48px+ per Figma)
  minHeightMobile: 48,
  paddingX: 16,
  paddingY: 12,
  bg: "transparent",
  bgHover: "#fafafa",
  bgActive: "#f4f4f5",
  bgSelected: "#eef4ff",
  border: "#e4e4e7",
  // Content
  gap: 12,
  // Header (optional tag/helper text)
  header: {
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    color: "#71717a"
  },
  // Title (Primary Text)
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    lineHeight: 1.4
  },
  // Description (Secondary Text)
  description: {
    fontSize: 13,
    color: "#71717a",
    lineHeight: 1.4,
    maxLines: 2
    // Maximum 2 lines per Figma
  },
  // Media (Start Area)
  media: {
    size: 40,
    iconSize: 20,
    iconColor: "#71717a"
  },
  // Actions (End Area)
  actions: {
    gap: 8,
    color: "#a1a1aa"
  },
  // Footer (optional)
  footer: {
    paddingTop: 8,
    gap: 8
  },
  // Divider
  divider: {
    color: "#e4e4e7",
    height: 1
  }
};
var Item2 = React2.forwardRef(
  ({
    title,
    description,
    header,
    helperText,
    media,
    leadingIcon: LeadingIcon,
    actions,
    showChevron = false,
    footer,
    showDivider = false,
    selected = false,
    disabled = false,
    clickable = false,
    href,
    size = "md",
    role: roleProp,
    "aria-label": ariaLabel,
    style,
    onClick,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const [isPressed, setIsPressed] = React2__namespace.useState(false);
    const [isFocused, setIsFocused] = React2__namespace.useState(false);
    const isInteractive = clickable || !!onClick || !!href;
    const role = roleProp || (isInteractive ? "button" : "listitem");
    const getBgColor = () => {
      if (selected) return ITEM_TOKENS.bgSelected;
      if (isPressed) return ITEM_TOKENS.bgActive;
      if (isHovered && isInteractive) return ITEM_TOKENS.bgHover;
      return ITEM_TOKENS.bg;
    };
    const getMinHeight = () => {
      return size === "sm" ? ITEM_TOKENS.minHeightMobile : ITEM_TOKENS.minHeight;
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      minHeight: getMinHeight(),
      padding: `${ITEM_TOKENS.paddingY}px ${ITEM_TOKENS.paddingX}px`,
      backgroundColor: getBgColor(),
      cursor: disabled ? "not-allowed" : isInteractive ? "pointer" : "default",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color 150ms ease",
      textDecoration: "none",
      color: "inherit",
      outline: isFocused && isInteractive ? `2px solid #2050f6` : "none",
      outlineOffset: -2,
      ...style
    };
    const mainContentStyle = {
      display: "flex",
      alignItems: "center",
      gap: ITEM_TOKENS.gap,
      width: "100%"
    };
    const mediaStyle = {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: ITEM_TOKENS.media.size,
      height: ITEM_TOKENS.media.size,
      color: ITEM_TOKENS.media.iconColor
    };
    const contentStyle = {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2
    };
    const headerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
      fontSize: ITEM_TOKENS.header.fontSize,
      fontWeight: ITEM_TOKENS.header.fontWeight,
      color: ITEM_TOKENS.header.color
    };
    const titleStyle = {
      fontSize: ITEM_TOKENS.title.fontSize,
      fontWeight: ITEM_TOKENS.title.fontWeight,
      color: ITEM_TOKENS.title.color,
      lineHeight: ITEM_TOKENS.title.lineHeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical"
    };
    const descriptionStyle = {
      fontSize: ITEM_TOKENS.description.fontSize,
      color: ITEM_TOKENS.description.color,
      lineHeight: ITEM_TOKENS.description.lineHeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: ITEM_TOKENS.description.maxLines,
      WebkitBoxOrient: "vertical"
    };
    const actionsStyle = {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: ITEM_TOKENS.actions.gap,
      color: ITEM_TOKENS.actions.color
    };
    const footerStyle = {
      display: "flex",
      alignItems: "center",
      gap: ITEM_TOKENS.footer.gap,
      paddingTop: ITEM_TOKENS.footer.paddingTop,
      marginTop: 8
    };
    const dividerStyle = {
      height: ITEM_TOKENS.divider.height,
      backgroundColor: ITEM_TOKENS.divider.color,
      border: "none",
      margin: 0,
      marginTop: ITEM_TOKENS.paddingY
    };
    const handleMouseDown = () => !disabled && setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsPressed(false);
    };
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const finalAriaLabel = ariaLabel || (typeof title === "string" ? `${title}${description ? `, ${description}` : ""}${selected ? ", selected" : ""}` : void 0);
    const mainContent = /* @__PURE__ */ jsxRuntime.jsxs("div", { style: mainContentStyle, children: [
      (media || LeadingIcon) && /* @__PURE__ */ jsxRuntime.jsx("span", { style: mediaStyle, children: media || LeadingIcon && /* @__PURE__ */ jsxRuntime.jsx(LeadingIcon, { size: ITEM_TOKENS.media.iconSize }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        header && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: header }),
          helperText && /* @__PURE__ */ jsxRuntime.jsx("span", { children: helperText })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { style: titleStyle, children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: description })
      ] }),
      (actions || showChevron) && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: actionsStyle, children: [
        actions,
        showChevron && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 20 })
      ] })
    ] });
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      mainContent,
      footer && /* @__PURE__ */ jsxRuntime.jsx("div", { style: footerStyle, children: footer }),
      showDivider && /* @__PURE__ */ jsxRuntime.jsx("hr", { style: dividerStyle })
    ] });
    const commonProps = {
      ref,
      role,
      "aria-label": finalAriaLabel,
      "aria-selected": selected ? true : void 0,
      "aria-disabled": disabled ? true : void 0,
      style: containerStyle,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onFocus: handleFocus,
      onBlur: handleBlur
    };
    if (href && !disabled) {
      const { ...anchorProps } = props;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          href,
          ...commonProps,
          ...anchorProps,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        onClick: disabled ? void 0 : onClick,
        tabIndex: isInteractive && !disabled ? 0 : void 0,
        ...commonProps,
        ...props,
        children: content
      }
    );
  }
);
Item2.displayName = "Item";
var List = React2.forwardRef(
  ({ divided = false, role: roleProp = "list", style, children, ...props }, ref) => {
    const listStyle = {
      display: "flex",
      flexDirection: "column",
      ...style
    };
    const childrenWithDividers = divided ? React2__namespace.Children.toArray(children).flatMap(
      (child, index, array) => index < array.length - 1 ? [child, /* @__PURE__ */ jsxRuntime.jsx("hr", { style: {
        margin: 0,
        border: "none",
        borderTop: `1px solid ${ITEM_TOKENS.border}`,
        marginLeft: ITEM_TOKENS.paddingX
      } }, `divider-${index}`)] : [child]
    ) : children;
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: roleProp, style: listStyle, ...props, children: childrenWithDividers });
  }
);
List.displayName = "List";
var SKELETON_TOKENS = {
  bg: "#e4e4e7",
  shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999
  },
  animation: {
    duration: "1.5s"
  }
};
var Skeleton = React2.forwardRef(
  ({
    width,
    height = 20,
    radius = "md",
    circle = false,
    animate = true,
    style,
    ...props
  }, ref) => {
    const size = circle ? typeof height === "number" ? height : 40 : void 0;
    const skeletonStyle = {
      display: "block",
      width: circle ? size : width,
      height: circle ? size : height,
      backgroundColor: SKELETON_TOKENS.bg,
      borderRadius: circle ? "50%" : SKELETON_TOKENS.radius[radius],
      overflow: "hidden",
      position: "relative",
      ...style
    };
    const shimmerStyle = animate ? {
      position: "absolute",
      inset: 0,
      background: SKELETON_TOKENS.shimmer,
      animation: `skeleton-shimmer ${SKELETON_TOKENS.animation.duration} infinite`
    } : {};
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: skeletonStyle, ...props, children: animate && /* @__PURE__ */ jsxRuntime.jsx("div", { style: shimmerStyle }) });
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonText = React2.forwardRef(
  ({ lines = 3, gap = 8, lastLineWidth = "60%", style, ...props }, ref) => {
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: containerStyle, ...props, children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        height: 16,
        width: i === lines - 1 ? lastLineWidth : "100%",
        radius: "sm"
      },
      i
    )) });
  }
);
SkeletonText.displayName = "SkeletonText";
var SkeletonCard = React2.forwardRef(
  ({ showImage = true, imageHeight = 160, style, ...props }, ref) => {
    const cardStyle = {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      border: "1px solid #e4e4e7",
      overflow: "hidden",
      ...style
    };
    const contentStyle = {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: cardStyle, ...props, children: [
      showImage && /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { width: "100%", height: imageHeight, radius: "none" }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { width: "60%", height: 20 }),
        /* @__PURE__ */ jsxRuntime.jsx(SkeletonText, { lines: 2 }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { width: 80, height: 32, radius: "full" }),
          /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { width: 80, height: 32, radius: "full" })
        ] })
      ] })
    ] });
  }
);
SkeletonCard.displayName = "SkeletonCard";
var SkeletonAvatar = React2.forwardRef(
  ({ size = 40, style, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        ref,
        circle: true,
        width: size,
        height: size,
        style,
        ...props
      }
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";
if (typeof document !== "undefined") {
  const styleId = "vistral-skeleton-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes skeleton-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
  }
}
var EMPTY_STATE_TOKENS = {
  // Icon
  icon: {
    size: 48,
    color: "#a1a1aa",
    // zinc-400
    bgSize: 80,
    bg: "#f4f4f5"
    // zinc-100
  },
  // Title
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: "#18181b"
    // zinc-900
  },
  // Description
  description: {
    fontSize: 14,
    color: "#71717a"
    // zinc-500
  },
  // Container
  padding: 32,
  maxWidth: 400
};
var PRESET_ICONS = {
  search: lucideReact.Search,
  inbox: lucideReact.Inbox,
  folder: lucideReact.FolderOpen,
  file: lucideReact.FileQuestion,
  error: lucideReact.AlertCircle,
  offline: lucideReact.WifiOff
};
var EmptyState = React2.forwardRef(
  ({
    icon = "file",
    title,
    description,
    primaryAction,
    secondaryAction,
    children,
    size = "md",
    style,
    ...props
  }, ref) => {
    const IconComponent = typeof icon === "string" ? PRESET_ICONS[icon] || lucideReact.FileQuestion : icon;
    const sizeMultiplier = size === "sm" ? 0.85 : size === "lg" ? 1.15 : 1;
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: EMPTY_STATE_TOKENS.padding * sizeMultiplier,
      maxWidth: EMPTY_STATE_TOKENS.maxWidth,
      margin: "0 auto",
      ...style
    };
    const iconContainerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: EMPTY_STATE_TOKENS.icon.bgSize * sizeMultiplier,
      height: EMPTY_STATE_TOKENS.icon.bgSize * sizeMultiplier,
      backgroundColor: EMPTY_STATE_TOKENS.icon.bg,
      borderRadius: "50%",
      marginBottom: 16
    };
    const titleStyle = {
      margin: 0,
      fontSize: EMPTY_STATE_TOKENS.title.fontSize * sizeMultiplier,
      fontWeight: EMPTY_STATE_TOKENS.title.fontWeight,
      color: EMPTY_STATE_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const descriptionStyle = {
      margin: "8px 0 0 0",
      fontSize: EMPTY_STATE_TOKENS.description.fontSize * sizeMultiplier,
      color: EMPTY_STATE_TOKENS.description.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1.5
    };
    const actionsStyle = {
      display: "flex",
      gap: 12,
      marginTop: 24,
      flexWrap: "wrap",
      justifyContent: "center"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: iconContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
        IconComponent,
        {
          size: EMPTY_STATE_TOKENS.icon.size * sizeMultiplier,
          color: EMPTY_STATE_TOKENS.icon.color,
          strokeWidth: 1.5
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx("h3", { style: titleStyle, children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: description }),
      children,
      (primaryAction || secondaryAction) && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: actionsStyle, children: [
        secondaryAction && /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "ghost",
            size: size === "sm" ? "sm" : "md",
            onClick: secondaryAction.onClick,
            children: secondaryAction.label
          }
        ),
        primaryAction && /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "primary",
            size: size === "sm" ? "sm" : "md",
            onClick: primaryAction.onClick,
            children: primaryAction.label
          }
        )
      ] })
    ] });
  }
);
EmptyState.displayName = "EmptyState";
var PROGRESS_TOKENS = {
  // Bar tokens
  bar: {
    height: {
      sm: 4,
      md: 8,
      lg: 12
    },
    bg: "#e4e4e7",
    // zinc-200
    fill: "#2050f6",
    // spaceblue-600
    fillSuccess: "#22c55e",
    // green-500
    fillError: "#ef4444",
    // red-500
    radius: 9999
  },
  // Circle tokens
  circle: {
    sizes: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96
    },
    strokeWidth: {
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6
    },
    bg: "#e4e4e7",
    fill: "#2050f6",
    fillSuccess: "#22c55e",
    fillError: "#ef4444"
  }
};
var ProgressBar = React2.forwardRef(
  ({
    value = 0,
    size = "md",
    status = "default",
    showLabel = false,
    indeterminate = false,
    style,
    ...props
  }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const height = PROGRESS_TOKENS.bar.height[size];
    const getFillColor = () => {
      if (status === "success") return PROGRESS_TOKENS.bar.fillSuccess;
      if (status === "error") return PROGRESS_TOKENS.bar.fillError;
      return PROGRESS_TOKENS.bar.fill;
    };
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      ...style
    };
    const trackStyle = {
      flex: 1,
      height,
      backgroundColor: PROGRESS_TOKENS.bar.bg,
      borderRadius: PROGRESS_TOKENS.bar.radius,
      overflow: "hidden"
    };
    const fillStyle = {
      height: "100%",
      width: indeterminate ? "30%" : `${clampedValue}%`,
      backgroundColor: getFillColor(),
      borderRadius: PROGRESS_TOKENS.bar.radius,
      transition: indeterminate ? "none" : "width 300ms ease-in-out",
      ...indeterminate && {
        animation: "progress-indeterminate 1.5s ease-in-out infinite"
      }
    };
    const labelStyle = {
      fontSize: 12,
      fontWeight: 500,
      color: "#3f3f46",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minWidth: 40,
      textAlign: "right"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-valuenow": indeterminate ? void 0 : clampedValue,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        style: containerStyle,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: trackStyle, children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: fillStyle }) }),
          showLabel && !indeterminate && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: labelStyle, children: [
            clampedValue,
            "%"
          ] })
        ]
      }
    );
  }
);
ProgressBar.displayName = "ProgressBar";
var ProgressCircle = React2.forwardRef(
  ({
    value = 0,
    size = "md",
    status = "default",
    showLabel = false,
    label,
    style,
    ...props
  }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const circleSize = PROGRESS_TOKENS.circle.sizes[size];
    const strokeWidth = PROGRESS_TOKENS.circle.strokeWidth[size];
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - clampedValue / 100 * circumference;
    const getFillColor = () => {
      if (status === "success") return PROGRESS_TOKENS.circle.fillSuccess;
      if (status === "error") return PROGRESS_TOKENS.circle.fillError;
      return PROGRESS_TOKENS.circle.fill;
    };
    const containerStyle = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: circleSize,
      height: circleSize,
      ...style
    };
    const svgStyle = {
      transform: "rotate(-90deg)"
    };
    const labelStyle = {
      position: "absolute",
      fontSize: size === "sm" ? 10 : size === "md" ? 12 : size === "lg" ? 14 : 18,
      fontWeight: 600,
      color: "#18181b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-valuenow": clampedValue,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        style: containerStyle,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "svg",
            {
              width: circleSize,
              height: circleSize,
              style: svgStyle,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "circle",
                  {
                    cx: circleSize / 2,
                    cy: circleSize / 2,
                    r: radius,
                    fill: "none",
                    stroke: PROGRESS_TOKENS.circle.bg,
                    strokeWidth
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "circle",
                  {
                    cx: circleSize / 2,
                    cy: circleSize / 2,
                    r: radius,
                    fill: "none",
                    stroke: getFillColor(),
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeDasharray: circumference,
                    strokeDashoffset,
                    style: { transition: "stroke-dashoffset 300ms ease-in-out" }
                  }
                )
              ]
            }
          ),
          (showLabel || label) && /* @__PURE__ */ jsxRuntime.jsx("span", { style: labelStyle, children: label || `${clampedValue}%` })
        ]
      }
    );
  }
);
ProgressCircle.displayName = "ProgressCircle";
if (typeof document !== "undefined") {
  const styleId = "vistral-progress-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes progress-indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `;
    document.head.appendChild(style);
  }
}
var ALERT_TOKENS = {
  variants: {
    info: {
      bg: "#eff6ff",
      // blue-50
      border: "#bfdbfe",
      // blue-200
      fg: "#1d4ed8",
      // blue-700
      icon: lucideReact.Info
    },
    success: {
      bg: "#f0fdf4",
      // green-50
      border: "#bbf7d0",
      // green-200
      fg: "#15803d",
      // green-700
      icon: lucideReact.CheckCircle2
    },
    warning: {
      bg: "#fffbeb",
      // amber-50
      border: "#fde68a",
      // amber-200
      fg: "#b45309",
      // amber-700
      icon: lucideReact.AlertTriangle
    },
    error: {
      bg: "#fef2f2",
      // red-50
      border: "#fecaca",
      // red-200
      fg: "#b91c1c",
      // red-700
      icon: lucideReact.AlertCircle
    }
  },
  radius: 8,
  padding: {
    sm: 12,
    md: 16
  }
};
var AlertContext = React2__namespace.createContext(null);
var Alert = React2.forwardRef(
  ({
    variant = "info",
    icon,
    dismissible = false,
    onDismiss,
    actionLabel,
    onAction,
    style,
    children,
    ...props
  }, ref) => {
    const tokens = ALERT_TOKENS.variants[variant];
    const IconComponent = icon === null ? null : icon || tokens.icon;
    const alertStyle = {
      display: "flex",
      gap: 12,
      padding: ALERT_TOKENS.padding.md,
      backgroundColor: tokens.bg,
      border: `1px solid ${tokens.border}`,
      borderRadius: ALERT_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const iconStyle = {
      flexShrink: 0,
      color: tokens.fg,
      marginTop: 2
    };
    const contentStyle = {
      flex: 1,
      minWidth: 0
    };
    const actionsStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    };
    const actionButtonStyle = {
      padding: "6px 12px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: tokens.fg,
      fontSize: 14,
      fontWeight: 500,
      borderRadius: 6,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    const dismissStyle = {
      padding: 4,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: tokens.fg,
      opacity: 0.6,
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    return /* @__PURE__ */ jsxRuntime.jsx(AlertContext.Provider, { value: { fg: tokens.fg }, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role: "alert", style: alertStyle, ...props, children: [
      IconComponent && /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { size: 20, style: iconStyle }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: contentStyle, children }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: actionsStyle, children: [
        actionLabel && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: actionButtonStyle,
            onClick: onAction,
            children: actionLabel
          }
        ),
        dismissible && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: dismissStyle,
            onClick: onDismiss,
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 })
          }
        )
      ] })
    ] }) });
  }
);
Alert.displayName = "Alert";
var AlertTitle = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const context = React2__namespace.useContext(AlertContext);
    const titleStyle = {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.4,
      color: context?.fg || "#18181b",
      // Use variant color
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("h5", { ref, style: titleStyle, ...props, children });
  }
);
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    const context = React2__namespace.useContext(AlertContext);
    const descStyle = {
      margin: "4px 0 0 0",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: context?.fg || "#3f3f46",
      // Use variant color
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, style: descStyle, ...props, children });
  }
);
AlertDescription.displayName = "AlertDescription";
var TOAST_TOKENS = {
  // Container
  width: 360,
  padding: 16,
  radius: 12,
  shadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
  borderWidth: 2,
  // Left border width for colored indicator
  gap: 12,
  // Gap between icon, content, and close button
  // Variants - white background with colored left border
  variants: {
    default: {
      bg: "#ffffff",
      border: "#e4e4e7",
      titleColor: "#18181b",
      descriptionColor: "#52525b",
      icon: lucideReact.Circle
      // Outline circle for default
    },
    success: {
      bg: "#ffffff",
      border: "#16a34a",
      titleColor: "#16a34a",
      descriptionColor: "#52525b",
      icon: lucideReact.CheckCircle2
    },
    error: {
      bg: "#ffffff",
      border: "#dc2626",
      titleColor: "#dc2626",
      descriptionColor: "#52525b",
      icon: lucideReact.AlertCircle
    },
    warning: {
      bg: "#ffffff",
      border: "#f59e0b",
      titleColor: "#f59e0b",
      descriptionColor: "#52525b",
      icon: lucideReact.AlertTriangle
    },
    info: {
      bg: "#ffffff",
      border: "#2050f6",
      titleColor: "#2050f6",
      descriptionColor: "#52525b",
      icon: lucideReact.Info
    }
  },
  // Default durations per Figma best practices
  durations: {
    success: 4e3,
    // 4 seconds for success
    error: 6e3,
    // 6 seconds for errors
    warning: 5e3,
    // 5 seconds for warnings
    info: 5e3,
    // 5 seconds for info
    default: 5e3
    // 5 seconds for default
  },
  // Close button
  closeButton: {
    color: "#2050f6",
    // Blue X icon per Figma
    size: 16
  },
  // Action button
  actionButton: {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 12px",
    radius: 6
  }
};
var ToastContext = React2.createContext(null);
function useToast() {
  const context = React2.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  const toast = React2.useCallback((options) => {
    return context.addToast(options);
  }, [context]);
  return {
    toast,
    dismiss: context.removeToast,
    toasts: context.toasts
  };
}
var ToastProvider = ({
  children,
  position = "bottom-right",
  max = 5
}) => {
  const [toasts, setToasts] = React2.useState([]);
  const addToast = React2.useCallback((toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      const newToasts = [...prev, { ...toast, id }];
      return newToasts.slice(-max);
    });
    return id;
  }, [max]);
  const removeToast = React2.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const positionStyles = {
    "top-right": { top: 16, right: 16 },
    "top-left": { top: 16, left: 16 },
    "bottom-right": { bottom: 16, right: 16 },
    "bottom-left": { bottom: 16, left: 16 },
    "top-center": { top: 16, left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)" }
  };
  const containerStyle = {
    position: "fixed",
    zIndex: 1e3,
    display: "flex",
    flexDirection: position.startsWith("top") ? "column" : "column-reverse",
    gap: 8,
    ...positionStyles[position]
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastContext.Provider, { value: { toasts, addToast, removeToast }, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: containerStyle, role: "region", "aria-label": "Notifications", children: toasts.map((toast) => /* @__PURE__ */ jsxRuntime.jsx(ToastItem, { toast, onDismiss: () => removeToast(toast.id) }, toast.id)) })
  ] });
};
ToastProvider.displayName = "ToastProvider";
var ToastItem = ({ toast, onDismiss }) => {
  const variant = toast.variant || "default";
  const tokens = TOAST_TOKENS.variants[variant];
  const Icon2 = tokens.icon;
  const getDefaultDuration = () => {
    return TOAST_TOKENS.durations[variant];
  };
  React2__namespace.useEffect(() => {
    const duration = toast.duration !== void 0 ? toast.duration : getDefaultDuration();
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onDismiss]);
  const isCritical = variant === "error" || variant === "warning";
  const ariaRole = isCritical ? "alert" : "status";
  const ariaLive = isCritical ? "assertive" : "polite";
  const toastStyle = {
    display: "flex",
    gap: TOAST_TOKENS.gap,
    alignItems: "flex-start",
    width: TOAST_TOKENS.width,
    padding: TOAST_TOKENS.padding,
    backgroundColor: tokens.bg,
    border: `1px solid ${variant === "default" ? tokens.border : "#e4e4e7"}`,
    borderLeft: `${TOAST_TOKENS.borderWidth}px solid ${tokens.border}`,
    borderRadius: TOAST_TOKENS.radius,
    boxShadow: TOAST_TOKENS.shadow,
    animation: "toast-enter 200ms ease-out",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };
  const iconStyle = {
    flexShrink: 0,
    color: tokens.border,
    // Use border color for icon
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const contentStyle = {
    flex: 1,
    minWidth: 0
  };
  const titleStyle = {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: tokens.titleColor,
    // Colored title per Figma
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    lineHeight: 1.4
  };
  const descriptionStyle = {
    margin: "4px 0 0 0",
    fontSize: 13,
    color: tokens.descriptionColor,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    lineHeight: 1.5
  };
  const closeStyle = {
    flexShrink: 0,
    padding: 4,
    background: "none",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    color: TOAST_TOKENS.closeButton.color,
    // Blue X icon per Figma
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 150ms ease-in-out"
  };
  const actionStyle = {
    marginTop: 8,
    padding: TOAST_TOKENS.actionButton.padding,
    fontSize: TOAST_TOKENS.actionButton.fontSize,
    fontWeight: TOAST_TOKENS.actionButton.fontWeight,
    color: tokens.titleColor,
    backgroundColor: "transparent",
    border: `1px solid ${tokens.border}`,
    borderRadius: TOAST_TOKENS.actionButton.radius,
    cursor: "pointer",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "background-color 150ms ease-in-out"
  };
  const handleActionClick = (e) => {
    e.stopPropagation();
    toast.action?.onClick();
  };
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onDismiss();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      style: toastStyle,
      role: ariaRole,
      "aria-live": ariaLive,
      "aria-atomic": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: iconStyle, children: variant === "default" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { size: 20, strokeWidth: 2, fill: "none" }) : /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { style: titleStyle, children: toast.title }),
          toast.description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: toast.description }),
          toast.action && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              style: actionStyle,
              onClick: handleActionClick,
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = `${tokens.border}15`;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              },
              children: toast.action.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            style: closeStyle,
            onClick: handleCloseClick,
            "aria-label": "Dismiss notification",
            onMouseEnter: (e) => {
              e.currentTarget.style.opacity = "0.7";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.opacity = "1";
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: TOAST_TOKENS.closeButton.size })
          }
        )
      ]
    }
  );
};
if (typeof document !== "undefined") {
  const styleId = "vistral-toast-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes toast-enter {
        from { 
          opacity: 0; 
          transform: translateY(${typeof window !== "undefined" && window.innerWidth > 768 ? "8px" : "-8px"});
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
    `;
    document.head.appendChild(style);
  }
}
var BANNER_TOKENS = {
  // Container
  padding: 12,
  paddingX: 16,
  // Variants
  variants: {
    info: { bg: "#eff6ff", border: "#bfdbfe", fg: "#1d4ed8", icon: lucideReact.Info },
    success: { bg: "#f0fdf4", border: "#bbf7d0", fg: "#15803d", icon: lucideReact.CheckCircle },
    warning: { bg: "#fffbeb", border: "#fde68a", fg: "#b45309", icon: lucideReact.AlertTriangle },
    error: { bg: "#fef2f2", border: "#fecaca", fg: "#b91c1c", icon: lucideReact.AlertCircle },
    promo: { bg: "#faf5ff", border: "#e9d5ff", fg: "#7c3aed", icon: lucideReact.Megaphone },
    neutral: { bg: "#f4f4f5", border: "#e4e4e7", fg: "#3f3f46", icon: lucideReact.Info }
  },
  // Typography
  title: {
    fontSize: 14,
    fontWeight: 600
  },
  message: {
    fontSize: 14
  }
};
var Banner = React2.forwardRef(
  ({
    variant = "info",
    title,
    icon: customIcon,
    hideIcon = false,
    dismissible = false,
    onDismiss,
    action,
    fixed = false,
    style,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React2.useState(true);
    if (!isVisible) return null;
    const tokens = BANNER_TOKENS.variants[variant];
    const Icon2 = customIcon || tokens.icon;
    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };
    const containerStyle = {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      padding: `${BANNER_TOKENS.padding}px ${BANNER_TOKENS.paddingX}px`,
      backgroundColor: tokens.bg,
      borderBottom: `1px solid ${tokens.border}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...fixed && {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
      },
      ...style
    };
    const iconStyle = {
      flexShrink: 0,
      color: tokens.fg,
      marginTop: 2
    };
    const contentStyle = {
      flex: 1,
      minWidth: 0
    };
    const titleStyle = {
      margin: 0,
      fontSize: BANNER_TOKENS.title.fontSize,
      fontWeight: BANNER_TOKENS.title.fontWeight,
      color: tokens.fg
    };
    const messageStyle = {
      margin: title ? "4px 0 0" : 0,
      fontSize: BANNER_TOKENS.message.fontSize,
      color: "#3f3f46"
    };
    const actionsStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    };
    const actionButtonStyle = {
      padding: "6px 12px",
      fontSize: 13,
      fontWeight: 500,
      color: tokens.fg,
      backgroundColor: "transparent",
      border: `1px solid ${tokens.border}`,
      borderRadius: 6,
      cursor: "pointer"
    };
    const closeButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      background: "none",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      color: "#71717a"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role: "alert", style: containerStyle, ...props, children: [
      !hideIcon && /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 20, style: iconStyle }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        title && /* @__PURE__ */ jsxRuntime.jsx("p", { style: titleStyle, children: title }),
        children && /* @__PURE__ */ jsxRuntime.jsx("p", { style: messageStyle, children })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: actionsStyle, children: [
        action && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: actionButtonStyle, onClick: action.onClick, children: action.label }),
        dismissible && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: closeButtonStyle, onClick: handleDismiss, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 }) })
      ] })
    ] });
  }
);
Banner.displayName = "Banner";
var PromoBanner = React2.forwardRef(
  ({
    background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color = "#ffffff",
    dismissible = true,
    onDismiss,
    style,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React2.useState(true);
    if (!isVisible) return null;
    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: "12px 16px",
      background,
      color,
      textAlign: "center",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 14,
      fontWeight: 500,
      ...style
    };
    const closeStyle = {
      position: "absolute",
      right: 16,
      display: "flex",
      padding: 4,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "inherit",
      opacity: 0.8
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: { ...containerStyle, position: "relative" }, ...props, children: [
      children,
      dismissible && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: closeStyle, onClick: handleDismiss, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 }) })
    ] });
  }
);
PromoBanner.displayName = "PromoBanner";
var AVATAR_TOKENS = {
  // Sizes
  sizes: {
    xs: { size: 24, fontSize: 10, iconSize: 14 },
    sm: { size: 32, fontSize: 12, iconSize: 18 },
    md: { size: 40, fontSize: 14, iconSize: 20 },
    lg: { size: 48, fontSize: 16, iconSize: 24 },
    xl: { size: 64, fontSize: 20, iconSize: 32 },
    "2xl": { size: 96, fontSize: 28, iconSize: 48 }
  },
  // Default colors for initials (based on name hash) - reduced palette
  colors: [
    { bg: "#dbeafe", fg: "#1d4ed8" },
    // blue
    { bg: "#dcfce7", fg: "#15803d" },
    // green
    { bg: "#fef3c7", fg: "#b45309" }
    // amber
  ],
  // Fallback
  fallback: {
    bg: "#f4f4f5",
    // zinc-100
    fg: "#71717a"
    // zinc-500
  },
  // Border for group overlap
  border: "#ffffff",
  borderWidth: 2
};
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var Avatar = React2.forwardRef(
  ({
    src,
    alt,
    name,
    size = "md",
    initials,
    showStatus = false,
    status = "online",
    style,
    ...props
  }, ref) => {
    const [imgError, setImgError] = React2__namespace.useState(false);
    const sizeTokens = AVATAR_TOKENS.sizes[size];
    const colorIndex = name ? hashString(name) % AVATAR_TOKENS.colors.length : 0;
    const colors = name ? AVATAR_TOKENS.colors[colorIndex] : AVATAR_TOKENS.fallback;
    const showImage = src && !imgError;
    const displayInitials = initials || (name ? getInitials(name) : null);
    const avatarStyle = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: sizeTokens.size,
      height: sizeTokens.size,
      borderRadius: "50%",
      backgroundColor: showImage ? "transparent" : colors.bg,
      color: colors.fg,
      fontSize: sizeTokens.fontSize,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      // No overflow:hidden to allow badge to show
      flexShrink: 0,
      ...style
    };
    const imgStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%"
      // Clip image with border-radius instead
    };
    const statusColors = {
      online: "#22c55e",
      // green-500
      offline: "#71717a",
      // zinc-500
      busy: "#ef4444",
      // red-500
      away: "#f59e0b"
      // amber-500
    };
    const statusSize = Math.max(8, sizeTokens.size * 0.25);
    const statusStyle = {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: statusSize,
      height: statusSize,
      borderRadius: "50%",
      backgroundColor: statusColors[status],
      border: `2px solid ${AVATAR_TOKENS.border}`,
      boxSizing: "content-box"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { ref, style: avatarStyle, ...props, children: [
      showImage ? /* @__PURE__ */ jsxRuntime.jsx(
        "img",
        {
          src,
          alt: alt || name || "Avatar",
          style: imgStyle,
          onError: () => setImgError(true)
        }
      ) : displayInitials ? displayInitials : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.User, { size: sizeTokens.iconSize }),
      showStatus && /* @__PURE__ */ jsxRuntime.jsx("span", { style: statusStyle })
    ] });
  }
);
Avatar.displayName = "Avatar";
var AvatarGroup = React2.forwardRef(
  ({
    max = 5,
    size = "md",
    overlap = 0.3,
    style,
    children,
    ...props
  }, ref) => {
    const sizeTokens = AVATAR_TOKENS.sizes[size];
    const overlapPx = sizeTokens.size * overlap;
    const childArray = React2__namespace.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;
    const groupStyle = {
      display: "inline-flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      ...style
    };
    const itemStyle = {
      marginLeft: -overlapPx,
      border: `${AVATAR_TOKENS.borderWidth}px solid ${AVATAR_TOKENS.border}`,
      borderRadius: "50%"
    };
    const counterStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: sizeTokens.size,
      height: sizeTokens.size,
      marginLeft: -overlapPx,
      borderRadius: "50%",
      backgroundColor: "#e4e4e7",
      color: "#3f3f46",
      fontSize: sizeTokens.fontSize,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      border: `${AVATAR_TOKENS.borderWidth}px solid ${AVATAR_TOKENS.border}`
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: groupStyle, ...props, children: [
      remainingCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: counterStyle, children: [
        "+",
        remainingCount
      ] }),
      visibleChildren.reverse().map((child, index) => /* @__PURE__ */ jsxRuntime.jsx("span", { style: itemStyle, children: React2__namespace.cloneElement(child, { size }) }, index))
    ] });
  }
);
AvatarGroup.displayName = "AvatarGroup";
var LIGHTBOX_TOKENS = {
  // Overlay
  overlay: {
    bg: "rgba(24, 24, 27, 0.95)"
  },
  // Header
  header: {
    height: 56,
    bg: "rgba(24, 24, 27, 0.98)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: "0 16px"
  },
  // Controls
  controls: {
    size: 40,
    bg: "transparent",
    bgHover: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    radius: 8
  },
  // Counter
  counter: {
    fontSize: 14,
    fontWeight: 500,
    color: "#ffffff"
  },
  // File name
  fileName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#ffffff"
  },
  // Zoom controls
  zoom: {
    fontSize: 14,
    fontWeight: 500,
    color: "#ffffff",
    gap: 8
  },
  // Thumbnails strip
  thumbnails: {
    height: 80,
    bg: "rgba(24, 24, 27, 0.98)",
    gap: 8,
    itemSize: 64,
    itemRadius: 8,
    borderActive: "2px solid #2050f6",
    borderInactive: "2px solid transparent"
  },
  // Navigation arrows
  navArrow: {
    size: 48,
    bg: "rgba(0, 0, 0, 0.5)",
    bgHover: "rgba(0, 0, 0, 0.7)",
    color: "#ffffff",
    radius: 9999
  },
  // Annotation card
  annotation: {
    bg: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    radius: 12,
    shadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
    maxWidth: 320,
    gap: 8
  },
  // Page thumbnails sidebar (for documents)
  pageSidebar: {
    width: 120,
    bg: "rgba(24, 24, 27, 0.98)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 8,
    gap: 8,
    itemHeight: 80,
    itemRadius: 4,
    borderActive: "2px solid #2050f6"
  }
};
var Lightbox = ({
  images,
  initialIndex = 0,
  open: controlledOpen,
  onOpenChange,
  variant = "image",
  showThumbnails = true,
  showCounter = true,
  enableZoom = false,
  zoomLevel: controlledZoomLevel,
  onZoomChange,
  enableDownload = false,
  showBack = false,
  onBack,
  secondaryAction,
  annotation,
  closeOnBackdrop = true,
  enableKeyboard = true
}) => {
  const [internalOpen, setInternalOpen] = React2.useState(false);
  const [currentIndex, setCurrentIndex] = React2.useState(initialIndex);
  const [internalZoomLevel, setInternalZoomLevel] = React2.useState(100);
  const thumbnailsRef = React2.useRef(null);
  const lightboxRef = React2.useRef(null);
  const previousFocusRef = React2.useRef(null);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const isZoomControlled = controlledZoomLevel !== void 0;
  const zoomLevel = isZoomControlled ? controlledZoomLevel : internalZoomLevel;
  const setOpen = React2.useCallback((newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setZoomLevel(100);
    }
  }, [isControlled, onOpenChange]);
  const setZoomLevel = React2.useCallback((newZoom) => {
    if (!isZoomControlled) {
      setInternalZoomLevel(newZoom);
    }
    onZoomChange?.(newZoom);
  }, [isZoomControlled, onZoomChange]);
  React2.useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      setZoomLevel(100);
      previousFocusRef.current = document.activeElement;
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [open, initialIndex, setZoomLevel]);
  React2.useEffect(() => {
    if (!open || !lightboxRef.current) return;
    const handleTab = (e) => {
      const focusableElements = lightboxRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);
  React2.useEffect(() => {
    if (!open || !enableKeyboard) return;
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, enableKeyboard, currentIndex]);
  React2.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  React2.useEffect(() => {
    if (thumbnailsRef.current && showThumbnails && variant === "image") {
      const thumbnail = thumbnailsRef.current.children[currentIndex];
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex, showThumbnails, variant]);
  React2.useEffect(() => {
    if (open && lightboxRef.current) {
      const announcement = `Image ${currentIndex + 1} of ${images.length}`;
      const announcementEl = document.createElement("div");
      announcementEl.setAttribute("role", "status");
      announcementEl.setAttribute("aria-live", "polite");
      announcementEl.setAttribute("aria-atomic", "true");
      announcementEl.className = "sr-only";
      announcementEl.textContent = announcement;
      lightboxRef.current.appendChild(announcementEl);
      setTimeout(() => {
        announcementEl.remove();
      }, 1e3);
    }
  }, [open, currentIndex, images.length]);
  const goToPrevious = () => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : images.length - 1);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => prev < images.length - 1 ? prev + 1 : 0);
  };
  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 200);
    setZoomLevel(newZoom);
  };
  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 50);
    setZoomLevel(newZoom);
  };
  const handleDownload = () => {
    const image = images[currentIndex];
    const link = document.createElement("a");
    link.href = image.src;
    link.download = image.name || image.alt || `image-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setOpen(false);
    }
  };
  if (!open || images.length === 0) return null;
  const currentImage = images[currentIndex];
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: LIGHTBOX_TOKENS.overlay.bg,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: LIGHTBOX_TOKENS.header.height,
    padding: LIGHTBOX_TOKENS.header.padding,
    backgroundColor: LIGHTBOX_TOKENS.header.bg,
    borderBottom: `1px solid ${LIGHTBOX_TOKENS.header.borderColor}`,
    flexShrink: 0
  };
  const controlBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: LIGHTBOX_TOKENS.controls.size,
    height: LIGHTBOX_TOKENS.controls.size,
    backgroundColor: LIGHTBOX_TOKENS.controls.bg,
    color: LIGHTBOX_TOKENS.controls.color,
    border: "none",
    borderRadius: LIGHTBOX_TOKENS.controls.radius,
    cursor: "pointer",
    transition: "background-color 150ms"
  };
  const secondaryButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#2050f6",
    border: "1px solid #2050f6",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "all 150ms"
  };
  const mainAreaStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden"
  };
  const imageStyle = {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
    cursor: enableZoom ? "zoom-in" : "default",
    transition: "transform 200ms ease",
    transform: `scale(${zoomLevel / 100})`
  };
  const navArrowStyle = (side) => ({
    position: "absolute",
    [side]: 24,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: LIGHTBOX_TOKENS.navArrow.size,
    height: LIGHTBOX_TOKENS.navArrow.size,
    backgroundColor: LIGHTBOX_TOKENS.navArrow.bg,
    color: LIGHTBOX_TOKENS.navArrow.color,
    border: "none",
    borderRadius: LIGHTBOX_TOKENS.navArrow.radius,
    cursor: "pointer",
    zIndex: 10,
    transition: "background-color 150ms"
  });
  const thumbnailsContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: LIGHTBOX_TOKENS.thumbnails.height,
    padding: "8px 16px",
    backgroundColor: LIGHTBOX_TOKENS.thumbnails.bg,
    borderTop: `1px solid ${LIGHTBOX_TOKENS.header.borderColor}`,
    flexShrink: 0,
    overflow: "hidden"
  };
  const thumbnailsScrollStyle = {
    display: "flex",
    alignItems: "center",
    gap: LIGHTBOX_TOKENS.thumbnails.gap,
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    maxWidth: "100%"
  };
  const getThumbnailStyle = (index) => ({
    width: LIGHTBOX_TOKENS.thumbnails.itemSize,
    height: LIGHTBOX_TOKENS.thumbnails.itemSize,
    borderRadius: LIGHTBOX_TOKENS.thumbnails.itemRadius,
    objectFit: "cover",
    cursor: "pointer",
    border: index === currentIndex ? LIGHTBOX_TOKENS.thumbnails.borderActive : LIGHTBOX_TOKENS.thumbnails.borderInactive,
    opacity: index === currentIndex ? 1 : 0.6,
    transition: "opacity 150ms, border-color 150ms",
    flexShrink: 0
  });
  const annotationCardStyle = {
    position: "absolute",
    top: 80,
    right: 24,
    backgroundColor: LIGHTBOX_TOKENS.annotation.bg,
    padding: LIGHTBOX_TOKENS.annotation.padding,
    borderRadius: LIGHTBOX_TOKENS.annotation.radius,
    boxShadow: LIGHTBOX_TOKENS.annotation.shadow,
    maxWidth: LIGHTBOX_TOKENS.annotation.maxWidth,
    zIndex: 20
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: lightboxRef,
      style: overlayStyle,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Viewing ${currentImage.name || currentImage.alt || `image ${currentIndex + 1}`}`,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
            showBack && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: controlBtnStyle,
                onClick: handleBack,
                "aria-label": "Go back",
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg;
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowLeft, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: controlBtnStyle,
                onClick: () => setOpen(false),
                "aria-label": "Close lightbox",
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg;
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 20 })
              }
            ),
            showCounter && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: {
              fontSize: LIGHTBOX_TOKENS.counter.fontSize,
              fontWeight: LIGHTBOX_TOKENS.counter.fontWeight,
              color: LIGHTBOX_TOKENS.counter.color
            }, children: [
              currentIndex + 1,
              " / ",
              images.length
            ] }),
            currentImage.name && /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
              fontSize: LIGHTBOX_TOKENS.fileName.fontSize,
              fontWeight: LIGHTBOX_TOKENS.fileName.fontWeight,
              color: LIGHTBOX_TOKENS.fileName.color,
              marginLeft: 8
            }, children: currentImage.name })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
            enableZoom && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: LIGHTBOX_TOKENS.zoom.gap }, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: controlBtnStyle,
                  onClick: handleZoomOut,
                  "aria-label": `Zoom out to ${zoomLevel - 25}%`,
                  disabled: zoomLevel <= 50,
                  onMouseEnter: (e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover;
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg;
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ZoomOut, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { style: {
                fontSize: LIGHTBOX_TOKENS.zoom.fontSize,
                fontWeight: LIGHTBOX_TOKENS.zoom.fontWeight,
                color: LIGHTBOX_TOKENS.zoom.color,
                minWidth: 48,
                textAlign: "center"
              }, children: [
                zoomLevel,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: controlBtnStyle,
                  onClick: handleZoomIn,
                  "aria-label": `Zoom in to ${zoomLevel + 25}%`,
                  disabled: zoomLevel >= 200,
                  onMouseEnter: (e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover;
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg;
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ZoomIn, { size: 20 })
                }
              )
            ] }),
            secondaryAction && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: secondaryButtonStyle,
                onClick: secondaryAction.onClick,
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = "rgba(32, 80, 246, 0.1)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                },
                children: secondaryAction.label
              }
            ),
            enableDownload && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: controlBtnStyle,
                onClick: handleDownload,
                "aria-label": "Download image",
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg;
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Download, { size: 20 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            style: mainAreaStyle,
            onClick: closeOnBackdrop ? () => setOpen(false) : void 0,
            children: [
              images.length > 1 && variant === "image" && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: navArrowStyle("left"),
                  onClick: (e) => {
                    e.stopPropagation();
                    goToPrevious();
                  },
                  "aria-label": "Previous image",
                  onMouseEnter: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bgHover;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bg;
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 28 })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: currentImage.src,
                  alt: currentImage.alt || currentImage.name || `Image ${currentIndex + 1}`,
                  style: imageStyle,
                  onClick: (e) => {
                    e.stopPropagation();
                    if (enableZoom && zoomLevel < 200) {
                      handleZoomIn();
                    }
                  }
                }
              ),
              images.length > 1 && variant === "image" && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: navArrowStyle("right"),
                  onClick: (e) => {
                    e.stopPropagation();
                    goToNext();
                  },
                  "aria-label": "Next image",
                  onMouseEnter: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bgHover;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bg;
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 28 })
                }
              ),
              annotation && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: annotationCardStyle, children: [
                /* @__PURE__ */ jsxRuntime.jsx("h3", { style: {
                  margin: "0 0 8px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#18181b"
                }, children: annotation.title }),
                annotation.description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: {
                  margin: "0 0 8px",
                  fontSize: 13,
                  color: "#71717a",
                  lineHeight: 1.5
                }, children: annotation.description }),
                annotation.tags && annotation.tags.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 4 }, children: annotation.tags.map((tag, index) => /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    style: {
                      padding: "2px 8px",
                      fontSize: 12,
                      backgroundColor: "#f4f4f5",
                      color: "#71717a",
                      borderRadius: 4
                    },
                    children: tag
                  },
                  index
                )) })
              ] })
            ]
          }
        ),
        showThumbnails && variant === "image" && images.length > 1 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: thumbnailsContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref: thumbnailsRef, style: thumbnailsScrollStyle, children: images.map((image, index) => /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            src: image.thumbnail || image.src,
            alt: image.alt || `Thumbnail ${index + 1}`,
            style: getThumbnailStyle(index),
            onClick: () => {
              setCurrentIndex(index);
              setZoomLevel(100);
            },
            role: "button",
            tabIndex: 0,
            "aria-label": `Go to image ${index + 1}`,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCurrentIndex(index);
                setZoomLevel(100);
              }
            }
          },
          index
        )) }) })
      ]
    }
  );
};
Lightbox.displayName = "Lightbox";
var LightboxTrigger = ({
  images,
  initialIndex = 0,
  children,
  lightboxProps
}) => {
  const [open, setOpen] = React2.useState(false);
  const childProps = React2__namespace.isValidElement(children) ? children.props : {};
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    React2__namespace.cloneElement(children, {
      onClick: (e) => {
        e.preventDefault();
        setOpen(true);
        childProps.onClick?.(e);
      },
      style: { ...childProps.style, cursor: "pointer" }
    }),
    /* @__PURE__ */ jsxRuntime.jsx(
      Lightbox,
      {
        images,
        initialIndex,
        open,
        onOpenChange: setOpen,
        ...lightboxProps
      }
    )
  ] });
};
LightboxTrigger.displayName = "LightboxTrigger";
if (typeof document !== "undefined") {
  const styleId = "vistral-lightbox-sr-only";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
    document.head.appendChild(style);
  }
}
var MEDIA_HERO_TOKENS = {
  // Container
  container: {
    radius: 12,
    gap: 4
  },
  // Grid proportions
  grid: {
    mainWidth: "60%",
    sideWidth: "40%"
  },
  // Show all button
  button: {
    padding: "10px 20px",
    // Increased horizontal padding for larger button
    fontSize: 14,
    fontWeight: 500,
    bg: "#D9E7FF",
    // Secondary blue background (light blue)
    bgHover: "#C8D9FF",
    // Slightly darker on hover
    fg: "#162EB7",
    // Primary blue text color
    border: "none",
    // No border per Figma design
    radius: 16,
    // Pill shape - half of height (32px / 2 = 16px)
    shadow: "0 2px 8px rgba(0,0,0,0.15)",
    gap: 8,
    minWidth: "180px",
    // Increased width to fit "Show all photos" text in one line
    height: "32px"
    // Height from SVG
  },
  // Counter (mobile)
  counter: {
    padding: "6px 12px",
    fontSize: 13,
    fontWeight: 500,
    bg: "rgba(0, 0, 0, 0.6)",
    fg: "#ffffff",
    radius: 20
  },
  // Instance slot (stack overlay)
  instanceSlot: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10
  },
  // Overlay gradient for text readability
  overlayGradient: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)"
};
var MediaHero = React2.forwardRef(
  ({
    images,
    variant = "auto",
    height = 420,
    showAllButton = true,
    buttonText = "Show all photos",
    onShowAll,
    showCounter = true,
    visibleImages = 5,
    instanceSlot,
    enableHover = true,
    style,
    ...props
  }, ref) => {
    const [lightboxOpen, setLightboxOpen] = React2.useState(false);
    const [lightboxIndex, setLightboxIndex] = React2.useState(0);
    const [carouselIndex, setCarouselIndex] = React2.useState(0);
    const [isMobile, setIsMobile] = React2.useState(false);
    const [isHovered, setIsHovered] = React2.useState(null);
    React2.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
    const actualVariant = variant === "auto" ? isMobile ? "carousel" : "grid" : variant;
    const openLightbox = (index = 0) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
    };
    const handleShowAll = () => {
      if (onShowAll) {
        onShowAll();
      } else {
        openLightbox(0);
      }
    };
    React2.useEffect(() => {
      if (actualVariant === "carousel" && showCounter) {
        const announcement = `Showing photo ${carouselIndex + 1} of ${images.length}`;
        const announcementEl = document.createElement("div");
        announcementEl.setAttribute("role", "status");
        announcementEl.setAttribute("aria-live", "polite");
        announcementEl.setAttribute("aria-atomic", "true");
        announcementEl.className = "sr-only";
        announcementEl.textContent = announcement;
        document.body.appendChild(announcementEl);
        setTimeout(() => {
          announcementEl.remove();
        }, 1e3);
      }
    }, [carouselIndex, images.length, actualVariant, showCounter]);
    const containerStyle = {
      position: "relative",
      width: "100%",
      height,
      borderRadius: MEDIA_HERO_TOKENS.container.radius,
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const imageBaseStyle = (index) => ({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      cursor: "pointer",
      display: "block",
      transition: enableHover ? "transform 200ms ease" : "none",
      transform: enableHover && isHovered === index ? "scale(1.02)" : "scale(1)"
    });
    const showAllButtonWrapperStyle = {
      position: "absolute",
      bottom: 16,
      right: 16,
      zIndex: 10
    };
    if (actualVariant === "single" || images.length === 1) {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          style: containerStyle,
          ...props,
          onMouseEnter: () => setIsHovered(0),
          onMouseLeave: () => setIsHovered(null),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: images[0]?.src,
                alt: images[0]?.alt || "Hero image",
                style: imageBaseStyle(0),
                onClick: () => openLightbox(0)
              }
            ),
            instanceSlot && /* @__PURE__ */ jsxRuntime.jsx("div", { style: MEDIA_HERO_TOKENS.instanceSlot, children: instanceSlot }),
            showAllButton && images.length > 1 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: showAllButtonWrapperStyle, children: /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: MEDIA_HERO_TOKENS.button.gap,
                  padding: MEDIA_HERO_TOKENS.button.padding,
                  minWidth: MEDIA_HERO_TOKENS.button.minWidth,
                  height: MEDIA_HERO_TOKENS.button.height,
                  fontSize: MEDIA_HERO_TOKENS.button.fontSize,
                  fontWeight: MEDIA_HERO_TOKENS.button.fontWeight,
                  backgroundColor: MEDIA_HERO_TOKENS.button.bg,
                  color: MEDIA_HERO_TOKENS.button.fg,
                  borderRadius: MEDIA_HERO_TOKENS.button.radius,
                  boxShadow: MEDIA_HERO_TOKENS.button.shadow,
                  border: MEDIA_HERO_TOKENS.button.border,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background-color 150ms ease",
                  whiteSpace: "nowrap"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bgHover;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bg;
                },
                onClick: handleShowAll,
                "aria-label": `${buttonText} (${images.length} photos)`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Images, { size: 16, style: { flexShrink: 0, color: MEDIA_HERO_TOKENS.button.fg } }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { style: { whiteSpace: "nowrap" }, children: buttonText })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Lightbox,
              {
                images,
                initialIndex: lightboxIndex,
                open: lightboxOpen,
                onOpenChange: setLightboxOpen
              }
            )
          ]
        }
      );
    }
    if (actualVariant === "carousel") {
      const goToPrev = () => setCarouselIndex((i) => i > 0 ? i - 1 : images.length - 1);
      const goToNext = () => setCarouselIndex((i) => i < images.length - 1 ? i + 1 : 0);
      const navBtnStyle = (side) => ({
        position: "absolute",
        [side]: 12,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        color: "#18181b",
        border: "none",
        borderRadius: "50%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        zIndex: 10,
        touchAction: "manipulation"
        // Better touch handling
      });
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          style: containerStyle,
          ...props,
          role: "region",
          "aria-label": "Property photo gallery",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  height: "100%",
                  transition: "transform 300ms ease",
                  transform: `translateX(-${carouselIndex * 100}%)`,
                  touchAction: "pan-y"
                  // Allow vertical scroll
                },
                children: images.map((image, index) => /* @__PURE__ */ jsxRuntime.jsxs(
                  "div",
                  {
                    style: {
                      flexShrink: 0,
                      width: "100%",
                      height: "100%",
                      position: "relative"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(
                        "img",
                        {
                          src: image.src,
                          alt: image.alt || `Property photo ${index + 1}`,
                          style: imageBaseStyle(),
                          onClick: () => openLightbox(index),
                          loading: index === 0 ? "eager" : "lazy"
                        }
                      ),
                      instanceSlot && index === carouselIndex && /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
                        ...MEDIA_HERO_TOKENS.instanceSlot,
                        background: MEDIA_HERO_TOKENS.overlayGradient,
                        padding: "8px",
                        borderRadius: "8px"
                      }, children: instanceSlot })
                    ]
                  },
                  index
                ))
              }
            ),
            images.length > 1 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: navBtnStyle("left"),
                  onClick: goToPrev,
                  "aria-label": "Previous photo",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  style: navBtnStyle("right"),
                  onClick: goToNext,
                  "aria-label": "Next photo",
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 20 })
                }
              )
            ] }),
            showCounter && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
              position: "absolute",
              bottom: 16,
              right: 16,
              padding: MEDIA_HERO_TOKENS.counter.padding,
              fontSize: MEDIA_HERO_TOKENS.counter.fontSize,
              fontWeight: MEDIA_HERO_TOKENS.counter.fontWeight,
              backgroundColor: MEDIA_HERO_TOKENS.counter.bg,
              color: MEDIA_HERO_TOKENS.counter.fg,
              borderRadius: MEDIA_HERO_TOKENS.counter.radius,
              zIndex: 10
            }, children: [
              carouselIndex + 1,
              "/",
              images.length
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Lightbox,
              {
                images,
                initialIndex: lightboxIndex,
                open: lightboxOpen,
                onOpenChange: setLightboxOpen
              }
            )
          ]
        }
      );
    }
    const gridImages = images.slice(0, Math.min(visibleImages, 5));
    const gap = MEDIA_HERO_TOKENS.container.gap;
    const renderGrid = () => {
      if (gridImages.length === 1) {
        return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: "100%", position: "relative" }, children: /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            src: gridImages[0].src,
            alt: gridImages[0].alt || "Property photo",
            style: imageBaseStyle(0),
            onClick: () => openLightbox(0)
          }
        ) });
      }
      if (gridImages.length === 2) {
        return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", gap, height: "100%" }, children: gridImages.map((img, i) => /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            style: { flex: 1, overflow: "hidden", position: "relative" },
            onMouseEnter: () => setIsHovered(i),
            onMouseLeave: () => setIsHovered(null),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt || `Property photo ${i + 1}`,
                  style: imageBaseStyle(i),
                  onClick: () => openLightbox(i)
                }
              ),
              i === 1 && images.length > 2 && showAllButton && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    padding: "12px",
                    zIndex: 10
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    handleShowAll();
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: MEDIA_HERO_TOKENS.button.gap,
                        padding: MEDIA_HERO_TOKENS.button.padding,
                        minWidth: MEDIA_HERO_TOKENS.button.minWidth,
                        height: MEDIA_HERO_TOKENS.button.height,
                        fontSize: MEDIA_HERO_TOKENS.button.fontSize,
                        fontWeight: MEDIA_HERO_TOKENS.button.fontWeight,
                        backgroundColor: MEDIA_HERO_TOKENS.button.bg,
                        color: MEDIA_HERO_TOKENS.button.fg,
                        borderRadius: MEDIA_HERO_TOKENS.button.radius,
                        boxShadow: MEDIA_HERO_TOKENS.button.shadow,
                        border: MEDIA_HERO_TOKENS.button.border,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "background-color 150ms ease"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bgHover;
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bg;
                      },
                      "aria-label": `${buttonText} (${images.length} photos)`,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Images, { size: 16, style: { flexShrink: 0, color: MEDIA_HERO_TOKENS.button.fg } }),
                        /* @__PURE__ */ jsxRuntime.jsx("span", { style: { whiteSpace: "nowrap" }, children: buttonText })
                      ]
                    }
                  )
                }
              )
            ]
          },
          i
        )) });
      }
      if (gridImages.length === 3) {
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", gap, height: "100%" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              style: { width: "60%", overflow: "hidden", position: "relative" },
              onMouseEnter: () => setIsHovered(0),
              onMouseLeave: () => setIsHovered(null),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: gridImages[0].src,
                  alt: gridImages[0].alt || "Main property photo",
                  style: imageBaseStyle(0),
                  onClick: () => openLightbox(0)
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: "40%", display: "flex", flexDirection: "column", gap }, children: gridImages.slice(1).map((img, i) => {
            const isLastThumbnail = i === gridImages.slice(1).length - 1;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                style: { flex: 1, overflow: "hidden", position: "relative" },
                onMouseEnter: () => setIsHovered(i + 1),
                onMouseLeave: () => setIsHovered(null),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "img",
                    {
                      src: img.src,
                      alt: img.alt || `Property photo ${i + 2}`,
                      style: imageBaseStyle(i + 1),
                      onClick: () => openLightbox(i + 1)
                    }
                  ),
                  isLastThumbnail && images.length > gridImages.length && showAllButton && /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: "12px",
                        zIndex: 10
                      },
                      onClick: (e) => {
                        e.stopPropagation();
                        handleShowAll();
                      },
                      children: /* @__PURE__ */ jsxRuntime.jsxs(
                        "button",
                        {
                          type: "button",
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: MEDIA_HERO_TOKENS.button.gap,
                            padding: MEDIA_HERO_TOKENS.button.padding,
                            fontSize: MEDIA_HERO_TOKENS.button.fontSize,
                            fontWeight: MEDIA_HERO_TOKENS.button.fontWeight,
                            backgroundColor: MEDIA_HERO_TOKENS.button.bg,
                            color: MEDIA_HERO_TOKENS.button.fg,
                            borderRadius: MEDIA_HERO_TOKENS.button.radius,
                            boxShadow: MEDIA_HERO_TOKENS.button.shadow,
                            border: MEDIA_HERO_TOKENS.button.border,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background-color 150ms ease"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bgHover;
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bg;
                          },
                          "aria-label": `${buttonText} (${images.length} photos)`,
                          children: [
                            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Images, { size: 16, style: { flexShrink: 0 } }),
                            /* @__PURE__ */ jsxRuntime.jsx("span", { children: buttonText })
                          ]
                        }
                      )
                    }
                  )
                ]
              },
              i
            );
          }) })
        ] });
      }
      if (gridImages.length === 4) {
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", gap, height: "100%" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              style: { width: "60%", overflow: "hidden", position: "relative" },
              onMouseEnter: () => setIsHovered(0),
              onMouseLeave: () => setIsHovered(null),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: gridImages[0].src,
                  alt: gridImages[0].alt || "Main property photo",
                  style: imageBaseStyle(0),
                  onClick: () => openLightbox(0)
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: "40%", display: "flex", flexDirection: "column", gap }, children: gridImages.slice(1).map((img, i) => /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              style: { flex: 1, overflow: "hidden", position: "relative" },
              onMouseEnter: () => setIsHovered(i + 1),
              onMouseLeave: () => setIsHovered(null),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt || `Property photo ${i + 2}`,
                  style: imageBaseStyle(i + 1),
                  onClick: () => openLightbox(i + 1)
                }
              )
            },
            i
          )) })
        ] });
      }
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", gap, height: "100%" }, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            style: { width: "60%", overflow: "hidden", position: "relative" },
            onMouseEnter: () => setIsHovered(0),
            onMouseLeave: () => setIsHovered(null),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: gridImages[0].src,
                alt: gridImages[0].alt || "Main property photo",
                style: imageBaseStyle(0),
                onClick: () => openLightbox(0)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
          width: "40%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap
        }, children: gridImages.slice(1, 5).map((img, i) => /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            style: { overflow: "hidden", position: "relative" },
            onMouseEnter: () => setIsHovered(i + 1),
            onMouseLeave: () => setIsHovered(null),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt || `Property photo ${i + 2}`,
                  style: imageBaseStyle(i + 1),
                  onClick: () => openLightbox(i + 1)
                }
              ),
              i === 3 && images.length > 5 && showAllButton && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    padding: "12px",
                    zIndex: 10
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    handleShowAll();
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: MEDIA_HERO_TOKENS.button.gap,
                        padding: MEDIA_HERO_TOKENS.button.padding,
                        minWidth: MEDIA_HERO_TOKENS.button.minWidth,
                        height: MEDIA_HERO_TOKENS.button.height,
                        fontSize: MEDIA_HERO_TOKENS.button.fontSize,
                        fontWeight: MEDIA_HERO_TOKENS.button.fontWeight,
                        backgroundColor: MEDIA_HERO_TOKENS.button.bg,
                        color: MEDIA_HERO_TOKENS.button.fg,
                        borderRadius: MEDIA_HERO_TOKENS.button.radius,
                        boxShadow: MEDIA_HERO_TOKENS.button.shadow,
                        border: MEDIA_HERO_TOKENS.button.border,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "background-color 150ms ease"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bgHover;
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = MEDIA_HERO_TOKENS.button.bg;
                      },
                      "aria-label": `${buttonText} (${images.length} photos)`,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Images, { size: 16, style: { flexShrink: 0, color: MEDIA_HERO_TOKENS.button.fg } }),
                        /* @__PURE__ */ jsxRuntime.jsx("span", { style: { whiteSpace: "nowrap" }, children: buttonText })
                      ]
                    }
                  )
                }
              )
            ]
          },
          i
        )) })
      ] });
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        style: containerStyle,
        ...props,
        role: "region",
        "aria-label": "Property photo gallery",
        children: [
          renderGrid(),
          instanceSlot && /* @__PURE__ */ jsxRuntime.jsx("div", { style: MEDIA_HERO_TOKENS.instanceSlot, children: instanceSlot }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Lightbox,
            {
              images,
              initialIndex: lightboxIndex,
              open: lightboxOpen,
              onOpenChange: setLightboxOpen
            }
          )
        ]
      }
    );
  }
);
MediaHero.displayName = "MediaHero";
if (typeof document !== "undefined") {
  const styleId = "vistral-media-hero-sr-only";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
    document.head.appendChild(style);
  }
}
var CAROUSEL_TOKENS = {
  // Navigation buttons (Desktop: 72px)
  nav: {
    size: 72,
    // Desktop size from Figma
    sizeMobile: 40,
    // Mobile size
    bg: "#ffffff",
    bgHover: "#f4f4f5",
    shadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    radius: 9999,
    color: "#18181b",
    offsetX: 8,
    // 8px from edge
    offsetY: 48
    // 48px from top/bottom center
  },
  // Dots pagination
  dots: {
    size: 8,
    gap: 8,
    bg: "#d4d4d8",
    bgActive: "#2050f6"
  },
  // Thumbnails
  thumbnails: {
    size: 60,
    gap: 8,
    radius: 8
  },
  // Slide
  gap: 16,
  // Counter
  counter: {
    fontSize: 14,
    color: "#71717a"
  }
};
var Carousel = React2.forwardRef(
  ({
    orientation = "horizontal",
    autoPlay = 0,
    showArrows = true,
    showDots = true,
    showThumbnails = false,
    showCounter = false,
    loop = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    gap = CAROUSEL_TOKENS.gap,
    height = 400,
    mobileVariant = "multi-item",
    edgeMasking = false,
    style,
    children,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React2.useState(0);
    const [isHovered, setIsHovered] = React2.useState(false);
    const trackRef = React2.useRef(null);
    const isVertical = orientation === "vertical";
    const slides = React2__namespace.Children.toArray(children);
    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    const goTo = React2.useCallback((index) => {
      if (loop) {
        if (index < 0) index = maxIndex;
        if (index > maxIndex) index = 0;
      } else {
        index = Math.max(0, Math.min(index, maxIndex));
      }
      setCurrentIndex(index);
    }, [loop, maxIndex]);
    const prev = () => goTo(currentIndex - slidesToScroll);
    const next = () => goTo(currentIndex + slidesToScroll);
    React2.useEffect(() => {
      if (autoPlay <= 0 || isHovered) return;
      const timer = setInterval(() => next(), autoPlay);
      return () => clearInterval(timer);
    }, [autoPlay, isHovered, currentIndex]);
    const containerStyle = {
      position: "relative",
      width: isVertical ? "auto" : "100%",
      height: isVertical ? height : "auto",
      ...style
    };
    const viewportStyle = {
      overflow: "hidden",
      height: isVertical ? "100%" : "auto",
      position: "relative",
      ...edgeMasking && {
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
      }
    };
    const trackStyle = isVertical ? {
      display: "flex",
      flexDirection: "column",
      gap,
      transition: "transform 300ms ease",
      transform: `translateY(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * gap}px))`
    } : {
      display: "flex",
      gap,
      transition: "transform 300ms ease",
      transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * gap}px))`
    };
    const slideStyle = isVertical ? {
      flexShrink: 0,
      height: slidesToShow === 1 ? "100%" : `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`
    } : {
      flexShrink: 0,
      width: slidesToShow === 1 ? "100%" : `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`
    };
    const navButtonStyleHorizontal = (side) => ({
      position: "absolute",
      top: `calc(50% - ${CAROUSEL_TOKENS.nav.offsetY}px)`,
      [side]: CAROUSEL_TOKENS.nav.offsetX,
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: CAROUSEL_TOKENS.nav.size,
      height: CAROUSEL_TOKENS.nav.size,
      backgroundColor: CAROUSEL_TOKENS.nav.bg,
      border: "none",
      borderRadius: CAROUSEL_TOKENS.nav.radius,
      boxShadow: CAROUSEL_TOKENS.nav.shadow,
      color: CAROUSEL_TOKENS.nav.color,
      cursor: "pointer",
      zIndex: 1,
      transition: "all 150ms ease"
    });
    const navButtonStyleVertical = (position) => ({
      position: "absolute",
      left: "50%",
      [position]: CAROUSEL_TOKENS.nav.offsetX,
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: CAROUSEL_TOKENS.nav.size,
      height: CAROUSEL_TOKENS.nav.size,
      backgroundColor: CAROUSEL_TOKENS.nav.bg,
      border: "none",
      borderRadius: CAROUSEL_TOKENS.nav.radius,
      boxShadow: CAROUSEL_TOKENS.nav.shadow,
      color: CAROUSEL_TOKENS.nav.color,
      cursor: "pointer",
      zIndex: 1,
      transition: "all 150ms ease"
    });
    const dotsContainerStyle = isVertical ? {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: CAROUSEL_TOKENS.dots.gap
    } : {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: CAROUSEL_TOKENS.dots.gap,
      marginTop: 16
    };
    const thumbnailsContainerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: CAROUSEL_TOKENS.thumbnails.gap,
      marginTop: 16
    };
    const getDotStyle = (index) => ({
      width: CAROUSEL_TOKENS.dots.size,
      height: CAROUSEL_TOKENS.dots.size,
      borderRadius: "50%",
      backgroundColor: index === currentIndex ? CAROUSEL_TOKENS.dots.bgActive : CAROUSEL_TOKENS.dots.bg,
      border: "none",
      padding: 0,
      cursor: "pointer",
      transition: "background-color 150ms ease"
    });
    const getThumbnailStyle = (index) => ({
      width: CAROUSEL_TOKENS.thumbnails.size,
      height: CAROUSEL_TOKENS.thumbnails.size,
      borderRadius: CAROUSEL_TOKENS.thumbnails.radius,
      overflow: "hidden",
      border: `2px solid ${index === currentIndex ? CAROUSEL_TOKENS.dots.bgActive : "transparent"}`,
      cursor: "pointer",
      opacity: index === currentIndex ? 1 : 0.7,
      transition: "all 150ms ease"
    });
    const counterStyle = {
      fontSize: CAROUSEL_TOKENS.counter.fontSize,
      color: CAROUSEL_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textAlign: "center",
      marginTop: 8
    };
    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < maxIndex;
    const currentSlide = currentIndex + 1;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        style: containerStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        role: "region",
        "aria-label": "Carousel",
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: viewportStyle, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref: trackRef, style: trackStyle, children: slides.map((slide, index) => /* @__PURE__ */ jsxRuntime.jsx("div", { style: slideStyle, children: slide }, index)) }) }),
          showArrows && totalSlides > slidesToShow && !isVertical && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: {
                  ...navButtonStyleHorizontal("left"),
                  opacity: canGoPrev ? 1 : 0.5,
                  backgroundColor: isHovered && canGoPrev ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg
                },
                onClick: prev,
                disabled: !canGoPrev,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 24 })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: {
                  ...navButtonStyleHorizontal("right"),
                  opacity: canGoNext ? 1 : 0.5,
                  backgroundColor: isHovered && canGoNext ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg
                },
                onClick: next,
                disabled: !canGoNext,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 24 })
              }
            )
          ] }),
          showArrows && totalSlides > slidesToShow && isVertical && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: {
                  ...navButtonStyleVertical("top"),
                  opacity: canGoPrev ? 1 : 0.5,
                  backgroundColor: isHovered && canGoPrev ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg
                },
                onClick: prev,
                disabled: !canGoPrev,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { size: 24 })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: {
                  ...navButtonStyleVertical("bottom"),
                  opacity: canGoNext ? 1 : 0.5,
                  backgroundColor: isHovered && canGoNext ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg
                },
                onClick: next,
                disabled: !canGoNext,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 24 })
              }
            )
          ] }),
          showCounter && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: counterStyle, children: [
            currentSlide,
            " of ",
            totalSlides
          ] }),
          showDots && totalSlides > slidesToShow && !showThumbnails && /* @__PURE__ */ jsxRuntime.jsx("div", { style: dotsContainerStyle, children: Array.from({ length: totalSlides }).map((_, index) => /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              style: getDotStyle(index),
              onClick: () => goTo(index),
              "aria-label": `Go to slide ${index + 1}`
            },
            index
          )) }),
          showThumbnails && totalSlides > slidesToShow && /* @__PURE__ */ jsxRuntime.jsx("div", { style: thumbnailsContainerStyle, children: slides.map((slide, index) => /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              style: getThumbnailStyle(index),
              onClick: () => goTo(index),
              "aria-label": `Go to slide ${index + 1}`,
              children: React2__namespace.isValidElement(slide) && React2__namespace.cloneElement(slide, {
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }
              })
            },
            index
          )) })
        ]
      }
    );
  }
);
Carousel.displayName = "Carousel";
var CarouselItem = React2.forwardRef(
  ({ style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: { width: "100%", ...style }, ...props, children });
  }
);
CarouselItem.displayName = "CarouselItem";
var CALENDAR_TOKENS = {
  // Container
  width: 280,
  padding: 16,
  bg: "#ffffff",
  border: "#e4e4e7",
  radius: 12,
  // Header
  header: {
    fontSize: 14,
    fontWeight: 600,
    color: "#18181b"
  },
  // Day cell
  cell: {
    size: 36,
    fontSize: 14,
    radius: 8,
    // States
    fg: "#18181b",
    fgMuted: "#a1a1aa",
    fgSelected: "#ffffff",
    bgHover: "#f4f4f5",
    bgSelected: "#2050f6",
    bgToday: "#eef4ff",
    bgRange: "#eef4ff"
  },
  // Weekday header
  weekday: {
    fontSize: 12,
    fontWeight: 500,
    color: "#71717a"
  }
};
var DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var Calendar = React2.forwardRef(
  ({
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabledDates = [],
    showToday = true,
    style,
    ...props
  }, ref) => {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const [currentMonth, setCurrentMonth] = React2.useState(() => {
      const date = value || defaultValue || today;
      return new Date(date.getFullYear(), date.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = React2.useState(value || defaultValue);
    React2__namespace.useEffect(() => {
      if (value) setSelectedDate(value);
    }, [value]);
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    const isDateDisabled = (date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some(
        (d) => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate()
      );
    };
    const isSameDay = (d1, d2) => {
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    };
    const handleDateClick = (day) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (isDateDisabled(date)) return;
      setSelectedDate(date);
      onChange?.(date);
    };
    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };
    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const containerStyle = {
      width: CALENDAR_TOKENS.width,
      padding: CALENDAR_TOKENS.padding,
      backgroundColor: CALENDAR_TOKENS.bg,
      border: `1px solid ${CALENDAR_TOKENS.border}`,
      borderRadius: CALENDAR_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const headerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    };
    const titleStyle = {
      fontSize: CALENDAR_TOKENS.header.fontSize,
      fontWeight: CALENDAR_TOKENS.header.fontWeight,
      color: CALENDAR_TOKENS.header.color
    };
    const navButtonStyle = {
      padding: 4,
      background: "none",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      color: "#71717a",
      display: "flex"
    };
    const weekdayRowStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      marginBottom: 8
    };
    const weekdayStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: CALENDAR_TOKENS.cell.size,
      fontSize: CALENDAR_TOKENS.weekday.fontSize,
      fontWeight: CALENDAR_TOKENS.weekday.fontWeight,
      color: CALENDAR_TOKENS.weekday.color
    };
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 2
    };
    const getDayStyle = (day) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isToday = showToday && isSameDay(date, today);
      const disabled = isDateDisabled(date);
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: CALENDAR_TOKENS.cell.size,
        height: CALENDAR_TOKENS.cell.size,
        fontSize: CALENDAR_TOKENS.cell.fontSize,
        borderRadius: CALENDAR_TOKENS.cell.radius,
        backgroundColor: isSelected ? CALENDAR_TOKENS.cell.bgSelected : isToday ? CALENDAR_TOKENS.cell.bgToday : "transparent",
        color: isSelected ? CALENDAR_TOKENS.cell.fgSelected : disabled ? CALENDAR_TOKENS.cell.fgMuted : CALENDAR_TOKENS.cell.fg,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        fontWeight: isToday ? 600 : 400,
        transition: "background-color 100ms ease"
      };
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: headerStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: navButtonStyle, onClick: prevMonth, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { style: titleStyle, children: [
          MONTHS[currentMonth.getMonth()],
          " ",
          currentMonth.getFullYear()
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", style: navButtonStyle, onClick: nextMonth, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: weekdayRowStyle, children: DAYS.map((day) => /* @__PURE__ */ jsxRuntime.jsx("div", { style: weekdayStyle, children: day }, day)) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: gridStyle, children: [
        Array.from({ length: firstDay }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: CALENDAR_TOKENS.cell.size, height: CALENDAR_TOKENS.cell.size } }, `empty-${i}`)),
        Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              style: getDayStyle(day),
              onClick: () => handleDateClick(day),
              disabled: isDateDisabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)),
              children: day
            },
            day
          );
        })
      ] })
    ] });
  }
);
Calendar.displayName = "Calendar";
var DATE_PICKER_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: "#ffffff",
    border: "#d4d4d8",
    borderFocus: "#2050f6",
    borderError: "#dc2626",
    radius: 8,
    placeholder: "#a1a1aa"
  }
};
var defaultFormatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};
var defaultParseDate = (str) => {
  const trimmed = str.trim();
  if (!trimmed) return void 0;
  let date = new Date(trimmed);
  if (!isNaN(date.getTime())) return date;
  const parts = trimmed.split(/[\/\-\.]/);
  if (parts.length === 3) {
    const [a, b, c] = parts.map((p) => parseInt(p, 10));
    if (a >= 1 && a <= 12 && b >= 1 && b <= 31 && c >= 1900) {
      date = new Date(c, a - 1, b);
      if (!isNaN(date.getTime())) return date;
    }
    if (b >= 1 && b <= 12 && a >= 1 && a <= 31 && c >= 1900) {
      date = new Date(c, b - 1, a);
      if (!isNaN(date.getTime())) return date;
    }
    if (a >= 1900 && b >= 1 && b <= 12 && c >= 1 && c <= 31) {
      date = new Date(a, b - 1, c);
      if (!isNaN(date.getTime())) return date;
    }
  }
  return void 0;
};
var DatePicker = React2.forwardRef(
  ({
    value,
    defaultValue,
    onChange,
    placeholder = "Select date",
    formatDate = defaultFormatDate,
    parseDate = defaultParseDate,
    minDate,
    maxDate,
    disabled = false,
    error = false,
    label,
    helperText,
    clearable = true,
    allowManualInput = true,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React2.useState(false);
    const [selectedDate, setSelectedDate] = React2.useState(value || defaultValue);
    const [isFocused, setIsFocused] = React2.useState(false);
    const [inputValue, setInputValue] = React2.useState(selectedDate ? formatDate(selectedDate) : "");
    const containerRef = React2.useRef(null);
    const inputRef = React2.useRef(null);
    React2.useEffect(() => {
      if (value !== void 0) {
        setSelectedDate(value);
        setInputValue(formatDate(value));
      }
    }, [value, formatDate]);
    React2.useEffect(() => {
      if (selectedDate) {
        setInputValue(formatDate(selectedDate));
      }
    }, [selectedDate, formatDate]);
    React2.useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const handleSelect = (date) => {
      setSelectedDate(date);
      setInputValue(formatDate(date));
      onChange?.(date);
      setIsOpen(false);
    };
    const handleClear = (e) => {
      e.stopPropagation();
      setSelectedDate(void 0);
      setInputValue("");
      onChange?.(void 0);
    };
    const handleInputChange = (e) => {
      const val = e.target.value;
      setInputValue(val);
      const parsed = parseDate(val);
      if (parsed) {
        if (minDate && parsed < minDate) return;
        if (maxDate && parsed > maxDate) return;
        setSelectedDate(parsed);
        onChange?.(parsed);
      }
    };
    const handleInputBlur = () => {
      setIsFocused(false);
      if (inputValue && !parseDate(inputValue)) {
        setInputValue(selectedDate ? formatDate(selectedDate) : "");
      }
    };
    const handleInputKeyDown = (e) => {
      if (e.key === "Enter") {
        const parsed = parseDate(inputValue);
        if (parsed) {
          handleSelect(parsed);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    const getBorderColor = () => {
      if (error) return DATE_PICKER_TOKENS.trigger.borderError;
      if (isFocused || isOpen) return DATE_PICKER_TOKENS.trigger.borderFocus;
      return DATE_PICKER_TOKENS.trigger.border;
    };
    const containerStyle = {
      position: "relative",
      width: "100%",
      ...style
    };
    const triggerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: "100%",
      height: DATE_PICKER_TOKENS.trigger.height,
      padding: `0 ${DATE_PICKER_TOKENS.trigger.paddingX}px`,
      backgroundColor: DATE_PICKER_TOKENS.trigger.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: DATE_PICKER_TOKENS.trigger.radius,
      fontSize: DATE_PICKER_TOKENS.trigger.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color 150ms ease"
    };
    const dropdownStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: 4,
      zIndex: 50
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, style: containerStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: {
        display: "block",
        marginBottom: 6,
        fontSize: 14,
        fontWeight: 500,
        color: "#18181b",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          style: triggerStyle,
          onClick: () => {
            if (!disabled && !allowManualInput) {
              setIsOpen(!isOpen);
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              lucideReact.Calendar,
              {
                size: 16,
                style: {
                  color: "#71717a",
                  flexShrink: 0,
                  cursor: "pointer"
                },
                onClick: (e) => {
                  e.stopPropagation();
                  if (!disabled) setIsOpen(!isOpen);
                }
              }
            ),
            allowManualInput ? /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: inputValue,
                onChange: handleInputChange,
                onFocus: () => setIsFocused(true),
                onBlur: handleInputBlur,
                onKeyDown: handleInputKeyDown,
                placeholder,
                disabled,
                style: {
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: DATE_PICKER_TOKENS.trigger.fontSize,
                  fontFamily: "inherit",
                  color: "#18181b"
                }
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                style: {
                  flex: 1,
                  color: selectedDate ? "#18181b" : DATE_PICKER_TOKENS.trigger.placeholder
                },
                tabIndex: disabled ? -1 : 0,
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
                children: selectedDate ? formatDate(selectedDate) : placeholder
              }
            ),
            clearable && selectedDate && !disabled && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: handleClear,
                style: {
                  padding: 2,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#71717a",
                  fontSize: 12
                },
                children: "\u2715"
              }
            )
          ]
        }
      ),
      helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { style: {
        margin: "6px 0 0",
        fontSize: 12,
        color: error ? "#dc2626" : "#71717a",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }, children: helperText }),
      isOpen && /* @__PURE__ */ jsxRuntime.jsx("div", { style: dropdownStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
        Calendar,
        {
          value: selectedDate,
          onChange: handleSelect,
          minDate,
          maxDate
        }
      ) })
    ] });
  }
);
DatePicker.displayName = "DatePicker";
var SLIDER_TOKENS = {
  // Track
  track: {
    height: 6,
    bg: "#e4e4e7",
    bgFilled: "#2050f6",
    radius: 9999
  },
  // Thumb
  thumb: {
    size: 20,
    bg: "#ffffff",
    border: "#2050f6",
    borderWidth: 2,
    shadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  // States
  disabled: {
    trackBg: "#f4f4f5",
    filledBg: "#a1a1aa",
    thumbBorder: "#a1a1aa"
  }
};
var Slider = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange,
    showValue = false,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [isDragging, setIsDragging] = React2.useState(false);
    const trackRef = React2.useRef(null);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const percentage = (value - min) / (max - min) * 100;
    const updateValue = React2.useCallback((clientX) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      if (!isControlled) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    }, [disabled, min, max, step, isControlled, onChange]);
    const handleMouseDown = (e) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.clientX);
    };
    React2__namespace.useEffect(() => {
      if (!isDragging) return;
      const handleMouseMove = (e) => {
        updateValue(e.clientX);
      };
      const handleMouseUp = () => {
        setIsDragging(false);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, updateValue]);
    const containerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      ...style
    };
    const trackContainerStyle = {
      position: "relative",
      flex: 1,
      height: 24,
      display: "flex",
      alignItems: "center",
      cursor: disabled ? "not-allowed" : "pointer"
    };
    const trackStyle = {
      position: "absolute",
      width: "100%",
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.trackBg : SLIDER_TOKENS.track.bg,
      borderRadius: SLIDER_TOKENS.track.radius
    };
    const filledStyle = {
      position: "absolute",
      height: SLIDER_TOKENS.track.height,
      width: `${percentage}%`,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.filledBg : SLIDER_TOKENS.track.bgFilled,
      borderRadius: SLIDER_TOKENS.track.radius
    };
    const thumbStyle = {
      position: "absolute",
      left: `${percentage}%`,
      transform: "translateX(-50%)",
      width: SLIDER_TOKENS.thumb.size,
      height: SLIDER_TOKENS.thumb.size,
      backgroundColor: SLIDER_TOKENS.thumb.bg,
      border: `${SLIDER_TOKENS.thumb.borderWidth}px solid ${disabled ? SLIDER_TOKENS.disabled.thumbBorder : SLIDER_TOKENS.thumb.border}`,
      borderRadius: "50%",
      boxShadow: SLIDER_TOKENS.thumb.shadow,
      cursor: disabled ? "not-allowed" : "grab",
      transition: isDragging ? "none" : "left 100ms ease",
      ...isDragging && { cursor: "grabbing", transform: "translateX(-50%) scale(1.1)" }
    };
    const valueStyle = {
      minWidth: 40,
      textAlign: "right",
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? "#a1a1aa" : "#18181b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref: trackRef,
          style: trackContainerStyle,
          onMouseDown: handleMouseDown,
          role: "slider",
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": value,
          "aria-disabled": disabled,
          tabIndex: disabled ? -1 : 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: trackStyle }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: filledStyle }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: thumbStyle })
          ]
        }
      ),
      showValue && /* @__PURE__ */ jsxRuntime.jsx("span", { style: valueStyle, children: value })
    ] });
  }
);
Slider.displayName = "Slider";
var RangeSlider = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = [25, 75],
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange,
    minGap = 0,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [activeThumb, setActiveThumb] = React2.useState(null);
    const trackRef = React2.useRef(null);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const percentage1 = (value[0] - min) / (max - min) * 100;
    const percentage2 = (value[1] - min) / (max - min) * 100;
    const updateValue = React2.useCallback((clientX, thumb) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      let newValue = [...value];
      if (thumb === 0) {
        newValue[0] = Math.max(min, Math.min(steppedValue, value[1] - minGap));
      } else {
        newValue[1] = Math.min(max, Math.max(steppedValue, value[0] + minGap));
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [disabled, min, max, step, value, minGap, isControlled, onChange]);
    const handleMouseDown = (thumb) => (e) => {
      if (disabled) return;
      e.stopPropagation();
      setActiveThumb(thumb);
      updateValue(e.clientX, thumb);
    };
    React2__namespace.useEffect(() => {
      if (activeThumb === null) return;
      const handleMouseMove = (e) => {
        updateValue(e.clientX, activeThumb);
      };
      const handleMouseUp = () => {
        setActiveThumb(null);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [activeThumb, updateValue]);
    const containerStyle = {
      position: "relative",
      width: "100%",
      height: SLIDER_TOKENS.thumb.size + 4,
      // Enough height for thumbs
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    };
    const trackWrapperStyle = {
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      transform: "translateY(-50%)"
    };
    const trackStyle = {
      width: "100%",
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.trackBg : SLIDER_TOKENS.track.bg,
      borderRadius: SLIDER_TOKENS.track.radius
    };
    const filledStyle = {
      position: "absolute",
      top: 0,
      left: `${percentage1}%`,
      width: `${percentage2 - percentage1}%`,
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.filledBg : SLIDER_TOKENS.track.bgFilled,
      borderRadius: SLIDER_TOKENS.track.radius
    };
    const getThumbStyle = (thumb) => ({
      position: "absolute",
      top: "50%",
      left: `${thumb === 0 ? percentage1 : percentage2}%`,
      transform: "translate(-50%, -50%)",
      width: SLIDER_TOKENS.thumb.size,
      height: SLIDER_TOKENS.thumb.size,
      backgroundColor: SLIDER_TOKENS.thumb.bg,
      border: `${SLIDER_TOKENS.thumb.borderWidth}px solid ${disabled ? SLIDER_TOKENS.disabled.thumbBorder : SLIDER_TOKENS.thumb.border}`,
      borderRadius: "50%",
      boxShadow: SLIDER_TOKENS.thumb.shadow,
      cursor: disabled ? "not-allowed" : "grab",
      zIndex: activeThumb === thumb ? 2 : 1,
      ...activeThumb === thumb && { cursor: "grabbing", transform: "translate(-50%, -50%) scale(1.1)" }
    });
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: containerStyle, ...props, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: trackRef, style: { position: "absolute", inset: 0 }, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: trackWrapperStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: trackStyle }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: filledStyle })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: getThumbStyle(0), onMouseDown: handleMouseDown(0) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: getThumbStyle(1), onMouseDown: handleMouseDown(1) })
    ] }) });
  }
);
RangeSlider.displayName = "RangeSlider";
var RATING_TOKENS = {
  // Star
  star: {
    color: "#fbbf24",
    colorEmpty: "#d4d4d8",
    colorHover: "#f59e0b"
  },
  // Sizes
  sizes: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  },
  gap: 4
};
var Rating = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = 0,
    max = 5,
    onChange,
    readOnly = false,
    disabled = false,
    allowHalf = false,
    size = "md",
    showValue = false,
    emptyIcon,
    filledIcon,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [hoverValue, setHoverValue] = React2.useState(null);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : value;
    const handleClick = (starValue) => {
      if (readOnly || disabled) return;
      const newValue = starValue === value ? 0 : starValue;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };
    const handleMouseMove = (e, starIndex) => {
      if (readOnly || disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = allowHalf && x < rect.width / 2;
      setHoverValue(starIndex + (isHalf ? 0.5 : 1));
    };
    const handleMouseLeave = () => {
      if (!readOnly && !disabled) {
        setHoverValue(null);
      }
    };
    const starSize = RATING_TOKENS.sizes[size];
    const containerStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: RATING_TOKENS.gap,
      ...style
    };
    const starsStyle = {
      display: "flex",
      alignItems: "center",
      gap: 2
    };
    const getStarStyle = (starIndex) => ({
      cursor: readOnly || disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "transform 150ms ease",
      display: "flex"
    });
    const renderStar = (starIndex) => {
      const starValue = starIndex + 1;
      const isFilled = displayValue >= starValue;
      const isHalfFilled = allowHalf && displayValue >= starIndex + 0.5 && displayValue < starValue;
      const color = isFilled || isHalfFilled ? hoverValue !== null ? RATING_TOKENS.star.colorHover : RATING_TOKENS.star.color : RATING_TOKENS.star.colorEmpty;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          style: getStarStyle(),
          onClick: () => handleClick(starValue),
          onMouseMove: (e) => handleMouseMove(e, starIndex),
          children: isHalfFilled ? (
            // Half star using clip
            /* @__PURE__ */ jsxRuntime.jsxs("span", { style: { position: "relative", display: "flex" }, children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { size: starSize, fill: RATING_TOKENS.star.colorEmpty, stroke: RATING_TOKENS.star.colorEmpty }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                overflow: "hidden"
              }, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { size: starSize, fill: color, stroke: color }) })
            ] })
          ) : filledIcon && isFilled ? filledIcon : emptyIcon && !isFilled ? emptyIcon : /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.Star,
            {
              size: starSize,
              fill: isFilled ? color : "none",
              stroke: color,
              strokeWidth: isFilled ? 0 : 1.5
            }
          )
        },
        starIndex
      );
    };
    const valueStyle = {
      fontSize: size === "sm" ? 12 : size === "md" ? 14 : 16,
      fontWeight: 500,
      color: "#18181b",
      marginLeft: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "slider",
        "aria-valuenow": value,
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-disabled": disabled,
        style: containerStyle,
        onMouseLeave: handleMouseLeave,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: starsStyle, children: Array.from({ length: max }).map((_, i) => renderStar(i)) }),
          showValue && /* @__PURE__ */ jsxRuntime.jsx("span", { style: valueStyle, children: displayValue.toFixed(allowHalf ? 1 : 0) })
        ]
      }
    );
  }
);
Rating.displayName = "Rating";
var RatingDisplay = React2.forwardRef(
  ({ value, count, size = "sm", style, ...props }, ref) => {
    const containerStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const valueStyle = {
      fontSize: size === "sm" ? 13 : size === "md" ? 14 : 16,
      fontWeight: 600,
      color: "#18181b"
    };
    const countStyle = {
      fontSize: size === "sm" ? 12 : size === "md" ? 13 : 14,
      color: "#71717a"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, style: containerStyle, ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { size: RATING_TOKENS.sizes[size], fill: RATING_TOKENS.star.color, stroke: RATING_TOKENS.star.color }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: valueStyle, children: value.toFixed(1) }),
      count !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: countStyle, children: [
        "(",
        count.toLocaleString(),
        ")"
      ] })
    ] });
  }
);
RatingDisplay.displayName = "RatingDisplay";
var COLOR_PICKER_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    radius: 8,
    border: "#d4d4d8",
    borderFocus: "#2050f6"
  },
  // Swatch
  swatch: {
    size: 24,
    radius: 4
  },
  // Dropdown
  dropdown: {
    width: 240,
    padding: 12,
    bg: "#ffffff",
    border: "#e4e4e7",
    shadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    radius: 12
  },
  // Presets
  presetSize: 28
};
var PRESET_COLORS = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#78716c",
  "#71717a",
  "#6b7280",
  "#64748b",
  "#475569"
];
var ColorPicker = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue = "#2050f6",
    onChange,
    label,
    disabled = false,
    showPresets = true,
    presets = PRESET_COLORS,
    showInput = true,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2.useState(defaultValue);
    const [isOpen, setIsOpen] = React2.useState(false);
    const [inputValue, setInputValue] = React2.useState("");
    const containerRef = React2.useRef(null);
    const isControlled = controlledValue !== void 0;
    const color = isControlled ? controlledValue : internalValue;
    React2.useEffect(() => {
      setInputValue(color);
    }, [color]);
    React2.useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const setColor = (newColor) => {
      if (!isControlled) {
        setInternalValue(newColor);
      }
      onChange?.(newColor);
    };
    const handleInputChange = (e) => {
      const val = e.target.value;
      setInputValue(val);
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        setColor(val);
      }
    };
    const handleNativeChange = (e) => {
      setColor(e.target.value);
    };
    const wrapperStyle = {
      position: "relative",
      width: "fit-content",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const triggerStyle = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: COLOR_PICKER_TOKENS.trigger.height,
      padding: `0 ${COLOR_PICKER_TOKENS.trigger.paddingX}px`,
      backgroundColor: "#ffffff",
      border: `1px solid ${isOpen ? COLOR_PICKER_TOKENS.trigger.borderFocus : COLOR_PICKER_TOKENS.trigger.border}`,
      borderRadius: COLOR_PICKER_TOKENS.trigger.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color 150ms ease"
    };
    const swatchStyle = {
      width: COLOR_PICKER_TOKENS.swatch.size,
      height: COLOR_PICKER_TOKENS.swatch.size,
      backgroundColor: color,
      borderRadius: COLOR_PICKER_TOKENS.swatch.radius,
      border: "1px solid rgba(0,0,0,0.1)"
    };
    const dropdownStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: 4,
      width: COLOR_PICKER_TOKENS.dropdown.width,
      padding: COLOR_PICKER_TOKENS.dropdown.padding,
      backgroundColor: COLOR_PICKER_TOKENS.dropdown.bg,
      border: `1px solid ${COLOR_PICKER_TOKENS.dropdown.border}`,
      borderRadius: COLOR_PICKER_TOKENS.dropdown.radius,
      boxShadow: COLOR_PICKER_TOKENS.dropdown.shadow,
      zIndex: 50
    };
    const nativeInputStyle = {
      width: "100%",
      height: 120,
      padding: 0,
      border: "none",
      borderRadius: 8,
      cursor: "pointer"
    };
    const presetsGridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(8, ${COLOR_PICKER_TOKENS.presetSize}px)`,
      gap: 4,
      marginTop: 12
    };
    const presetStyle = (presetColor) => ({
      width: COLOR_PICKER_TOKENS.presetSize,
      height: COLOR_PICKER_TOKENS.presetSize,
      backgroundColor: presetColor,
      border: color === presetColor ? "2px solid #2050f6" : "1px solid rgba(0,0,0,0.1)",
      borderRadius: 4,
      cursor: "pointer",
      padding: 0
    });
    const hexInputStyle = {
      width: "100%",
      height: 36,
      marginTop: 12,
      padding: "0 8px",
      fontSize: 13,
      fontFamily: "monospace",
      border: "1px solid #e4e4e7",
      borderRadius: 6,
      outline: "none"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, style: wrapperStyle, ...props, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { style: { display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "#18181b" }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          style: triggerStyle,
          onClick: () => !disabled && setIsOpen(!isOpen),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: swatchStyle }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 13, fontFamily: "monospace", color: "#3f3f46" }, children: color.toUpperCase() }),
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pipette, { size: 16, style: { color: "#71717a", marginLeft: "auto" } })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsxRuntime.jsxs("div", { style: dropdownStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "color",
            value: color,
            onChange: handleNativeChange,
            style: nativeInputStyle
          }
        ),
        showPresets && /* @__PURE__ */ jsxRuntime.jsx("div", { style: presetsGridStyle, children: presets.map((presetColor) => /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            style: presetStyle(presetColor),
            onClick: () => setColor(presetColor),
            title: presetColor
          },
          presetColor
        )) }),
        showInput && /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "text",
            value: inputValue,
            onChange: handleInputChange,
            placeholder: "#000000",
            style: hexInputStyle,
            maxLength: 7
          }
        )
      ] })
    ] });
  }
);
ColorPicker.displayName = "ColorPicker";
var TOGGLE_GROUP_TOKENS = {
  // Container
  container: {
    bg: "#f4f4f5",
    radius: 8,
    padding: 4
  },
  // Item
  item: {
    height: 32,
    paddingX: 12,
    fontSize: 13,
    fontWeight: 500,
    radius: 6,
    // States
    fg: "#71717a",
    fgActive: "#18181b",
    bgActive: "#ffffff",
    shadowActive: "0px 1px 2px rgba(0, 0, 0, 0.05)"
  }
};
var ToggleGroupContext = React2.createContext(null);
function useToggleGroup() {
  const context = React2.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }
  return context;
}
var ToggleGroup = React2.forwardRef(
  ({
    value: controlledValue,
    defaultValue,
    onValueChange,
    multiple = false,
    disabled = false,
    size = "md",
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React2__namespace.useState(
      defaultValue ?? (multiple ? [] : "")
    );
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleValueChange = (itemValue) => {
      if (disabled) return;
      let newValue;
      if (multiple) {
        const currentArray = Array.isArray(value) ? value : [];
        if (currentArray.includes(itemValue)) {
          newValue = currentArray.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentArray, itemValue];
        }
      } else {
        newValue = value === itemValue ? "" : itemValue;
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    const containerStyle = {
      display: "inline-flex",
      alignItems: "center",
      padding: TOGGLE_GROUP_TOKENS.container.padding,
      backgroundColor: TOGGLE_GROUP_TOKENS.container.bg,
      borderRadius: TOGGLE_GROUP_TOKENS.container.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      opacity: disabled ? 0.5 : 1,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(ToggleGroupContext.Provider, { value: { value, onValueChange: handleValueChange, multiple }, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "group",
        style: containerStyle,
        "data-size": size,
        ...props,
        children: React2__namespace.Children.map(children, (child) => {
          if (React2__namespace.isValidElement(child)) {
            return React2__namespace.cloneElement(child, { size });
          }
          return child;
        })
      }
    ) });
  }
);
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroupItem = React2.forwardRef(
  ({ value: itemValue, size = "md", disabled, style, children, ...props }, ref) => {
    const { value, onValueChange, multiple } = useToggleGroup();
    const isSelected = multiple ? Array.isArray(value) && value.includes(itemValue) : value === itemValue;
    const sizeStyles = {
      sm: { height: 28, paddingX: 10, fontSize: 12 },
      md: { height: 32, paddingX: 12, fontSize: 13 },
      lg: { height: 36, paddingX: 14, fontSize: 14 }
    };
    const currentSize = sizeStyles[size];
    const itemStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: currentSize.height,
      padding: `0 ${currentSize.paddingX}px`,
      fontSize: currentSize.fontSize,
      fontWeight: TOGGLE_GROUP_TOKENS.item.fontWeight,
      fontFamily: "inherit",
      color: isSelected ? TOGGLE_GROUP_TOKENS.item.fgActive : TOGGLE_GROUP_TOKENS.item.fg,
      backgroundColor: isSelected ? TOGGLE_GROUP_TOKENS.item.bgActive : "transparent",
      boxShadow: isSelected ? TOGGLE_GROUP_TOKENS.item.shadowActive : "none",
      border: "none",
      borderRadius: TOGGLE_GROUP_TOKENS.item.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 150ms ease",
      whiteSpace: "nowrap",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        role: "radio",
        "aria-checked": isSelected,
        disabled,
        style: itemStyle,
        onClick: () => onValueChange(itemValue),
        ...props,
        children
      }
    );
  }
);
ToggleGroupItem.displayName = "ToggleGroupItem";
var STEPPER_TOKENS = {
  // Step indicator
  indicator: {
    size: 32,
    fontSize: 14,
    fontWeight: 600,
    // States
    default: { bg: "#f4f4f5", fg: "#71717a", border: "#e4e4e7" },
    active: { bg: "#2050f6", fg: "#ffffff", border: "#2050f6" },
    completed: { bg: "#16a34a", fg: "#ffffff", border: "#16a34a" },
    error: { bg: "#fee2e2", fg: "#dc2626", border: "#dc2626" }
  },
  // Connector line
  connector: {
    height: 2,
    bg: "#e4e4e7",
    bgCompleted: "#16a34a"
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    colorMuted: "#71717a"
  },
  // Description
  description: {
    fontSize: 12,
    color: "#71717a"
  }
};
var StepperContext = React2.createContext(null);
function useStepper() {
  const context = React2.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}
var Stepper = React2.forwardRef(
  ({ currentStep, orientation = "horizontal", style, children, ...props }, ref) => {
    const totalSteps = React2__namespace.Children.count(children);
    const containerStyle = {
      display: "flex",
      flexDirection: orientation === "horizontal" ? "row" : "column",
      alignItems: orientation === "horizontal" ? "flex-start" : "stretch",
      gap: orientation === "horizontal" ? 0 : 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(StepperContext.Provider, { value: { currentStep, orientation, totalSteps }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: containerStyle, role: "list", ...props, children: React2__namespace.Children.map(children, (child, index) => {
      if (React2__namespace.isValidElement(child)) {
        return React2__namespace.cloneElement(child, { index });
      }
      return child;
    }) }) });
  }
);
Stepper.displayName = "Stepper";
var StepperStep = React2.forwardRef(
  ({ label, description, status: statusProp, icon, index = 0, style, ...props }, ref) => {
    const { currentStep, orientation, totalSteps } = useStepper();
    const isLast = index === totalSteps - 1;
    const status = statusProp || (index < currentStep ? "completed" : index === currentStep ? "active" : "pending");
    const getIndicatorColors = () => {
      switch (status) {
        case "completed":
          return STEPPER_TOKENS.indicator.completed;
        case "active":
          return STEPPER_TOKENS.indicator.active;
        case "error":
          return STEPPER_TOKENS.indicator.error;
        default:
          return STEPPER_TOKENS.indicator.default;
      }
    };
    const colors = getIndicatorColors();
    const stepStyle = {
      display: "flex",
      flexDirection: orientation === "horizontal" ? "column" : "row",
      alignItems: orientation === "horizontal" ? "center" : "flex-start",
      flex: orientation === "horizontal" && !isLast ? 1 : void 0,
      gap: orientation === "vertical" ? 12 : 0,
      ...style
    };
    const indicatorRowStyle = {
      display: "flex",
      alignItems: "center",
      width: orientation === "horizontal" ? "100%" : void 0
    };
    const indicatorStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: STEPPER_TOKENS.indicator.size,
      height: STEPPER_TOKENS.indicator.size,
      borderRadius: "50%",
      backgroundColor: colors.bg,
      color: colors.fg,
      border: `2px solid ${colors.border}`,
      fontSize: STEPPER_TOKENS.indicator.fontSize,
      fontWeight: STEPPER_TOKENS.indicator.fontWeight,
      flexShrink: 0
    };
    const connectorStyle = orientation === "horizontal" ? {
      flex: 1,
      height: STEPPER_TOKENS.connector.height,
      backgroundColor: status === "completed" || index < currentStep ? STEPPER_TOKENS.connector.bgCompleted : STEPPER_TOKENS.connector.bg,
      marginLeft: 8,
      marginRight: 8
    } : {
      width: STEPPER_TOKENS.connector.height,
      minHeight: 40,
      backgroundColor: status === "completed" || index < currentStep ? STEPPER_TOKENS.connector.bgCompleted : STEPPER_TOKENS.connector.bg,
      marginLeft: STEPPER_TOKENS.indicator.size / 2 - 1,
      marginTop: 4,
      marginBottom: 4
    };
    const contentStyle = {
      textAlign: orientation === "horizontal" ? "center" : "left",
      marginTop: orientation === "horizontal" ? 8 : 0,
      flex: orientation === "vertical" ? 1 : void 0
    };
    const labelStyle = {
      fontSize: STEPPER_TOKENS.label.fontSize,
      fontWeight: STEPPER_TOKENS.label.fontWeight,
      color: status === "pending" ? STEPPER_TOKENS.label.colorMuted : STEPPER_TOKENS.label.color
    };
    const descriptionStyle = {
      fontSize: STEPPER_TOKENS.description.fontSize,
      color: STEPPER_TOKENS.description.color,
      marginTop: 2
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "listitem", style: stepStyle, ...props, children: orientation === "horizontal" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: indicatorRowStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: indicatorStyle, children: status === "completed" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16 }) : icon || index + 1 }),
        !isLast && /* @__PURE__ */ jsxRuntime.jsx("div", { style: connectorStyle })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: labelStyle, children: label }),
        description && /* @__PURE__ */ jsxRuntime.jsx("div", { style: descriptionStyle, children: description })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: indicatorStyle, children: status === "completed" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16 }) : icon || index + 1 }),
        !isLast && /* @__PURE__ */ jsxRuntime.jsx("div", { style: connectorStyle })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: labelStyle, children: label }),
        description && /* @__PURE__ */ jsxRuntime.jsx("div", { style: descriptionStyle, children: description })
      ] })
    ] }) });
  }
);
StepperStep.displayName = "StepperStep";
var TIMELINE_TOKENS = {
  // Node (Marker)
  node: {
    size: 24,
    sizeSm: 10,
    // Small inner dot when no icon
    // States
    default: {
      bg: "#e4e4e7",
      border: "#e4e4e7",
      fg: "#71717a"
    },
    active: {
      bg: "#2050f6",
      border: "#2050f6",
      fg: "#ffffff"
    },
    success: {
      bg: "#16a34a",
      border: "#16a34a",
      fg: "#ffffff"
    },
    error: {
      bg: "#dc2626",
      border: "#dc2626",
      fg: "#ffffff"
    },
    warning: {
      bg: "#f59e0b",
      border: "#f59e0b",
      fg: "#ffffff"
    },
    pending: {
      bg: "transparent",
      border: "#e4e4e7",
      fg: "#71717a"
    }
  },
  // Connector (Line)
  connector: {
    width: 2,
    bg: "#e4e4e7"
  },
  // Content
  content: {
    gap: 12,
    paddingLeft: 12,
    paddingRight: 12
  },
  // Typography
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: "#18181b",
    lineHeight: 1.4
  },
  description: {
    fontSize: 13,
    color: "#71717a",
    lineHeight: 1.5
  },
  time: {
    fontSize: 12,
    color: "#a1a1aa",
    lineHeight: 1.4
  }
};
var Timeline = React2.forwardRef(
  ({ position = "left", style, children, ...props }, ref) => {
    const timelineStyle = {
      position: "relative",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, style: timelineStyle, role: "list", ...props, children: React2__namespace.Children.map(children, (child, index) => {
      if (React2__namespace.isValidElement(child)) {
        const isAlternate = position === "alternate";
        const itemPosition = isAlternate ? index % 2 === 0 ? "left" : "right" : position;
        return React2__namespace.cloneElement(child, {
          position: itemPosition,
          isLast: index === React2__namespace.Children.count(children) - 1
        });
      }
      return child;
    }) });
  }
);
Timeline.displayName = "Timeline";
var TimelineItem = React2.forwardRef(
  ({
    title,
    description,
    time,
    status = "default",
    icon: CustomIcon,
    position = "left",
    isLast = false,
    style,
    children,
    ...props
  }, ref) => {
    React2__namespace.useId();
    const nodeTokens = TIMELINE_TOKENS.node[status];
    const getIcon = () => {
      if (CustomIcon) return CustomIcon;
      switch (status) {
        case "success":
          return lucideReact.Check;
        case "error":
          return lucideReact.AlertCircle;
        case "pending":
          return lucideReact.Clock;
        case "active":
          return lucideReact.Circle;
        default:
          return null;
      }
    };
    const Icon2 = getIcon();
    const hasIcon = !!Icon2;
    const itemStyle = {
      display: "flex",
      flexDirection: position === "right" ? "row-reverse" : "row",
      gap: TIMELINE_TOKENS.content.gap,
      position: "relative",
      paddingBottom: isLast ? 0 : 24,
      ...style
    };
    const nodeContainerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexShrink: 0,
      width: TIMELINE_TOKENS.node.size,
      position: "relative"
    };
    const nodeStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: TIMELINE_TOKENS.node.size,
      height: TIMELINE_TOKENS.node.size,
      borderRadius: "50%",
      backgroundColor: nodeTokens.bg === "transparent" ? "transparent" : nodeTokens.bg,
      color: nodeTokens.fg,
      border: `2px solid ${nodeTokens.border}`,
      position: "relative",
      zIndex: 1,
      flexShrink: 0
    };
    const innerDotStyle = !hasIcon ? {
      width: TIMELINE_TOKENS.node.sizeSm,
      height: TIMELINE_TOKENS.node.sizeSm,
      borderRadius: "50%",
      backgroundColor: nodeTokens.bg === "transparent" ? nodeTokens.border : nodeTokens.bg
    } : {};
    const connectorStyle = !isLast ? {
      flex: 1,
      width: TIMELINE_TOKENS.connector.width,
      backgroundColor: TIMELINE_TOKENS.connector.bg,
      marginTop: 4,
      minHeight: 20
    } : {};
    const contentStyle = {
      flex: 1,
      paddingTop: 2,
      // Consistent vertical alignment with node
      textAlign: position === "right" ? "right" : "left",
      minWidth: 0
    };
    const titleStyle = {
      margin: 0,
      fontSize: TIMELINE_TOKENS.title.fontSize,
      fontWeight: TIMELINE_TOKENS.title.fontWeight,
      color: TIMELINE_TOKENS.title.color,
      lineHeight: TIMELINE_TOKENS.title.lineHeight
    };
    const descriptionStyle = {
      margin: "4px 0 0",
      fontSize: TIMELINE_TOKENS.description.fontSize,
      color: TIMELINE_TOKENS.description.color,
      lineHeight: TIMELINE_TOKENS.description.lineHeight
    };
    const timeStyle = {
      margin: "8px 0 0",
      fontSize: TIMELINE_TOKENS.time.fontSize,
      color: TIMELINE_TOKENS.time.color,
      lineHeight: TIMELINE_TOKENS.time.lineHeight
    };
    const ariaLabel = title ? `${title}${time ? `, ${time}` : ""}${status === "success" ? ", completed" : status === "error" ? ", error" : status === "active" ? ", in progress" : ""}` : void 0;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "listitem",
        "aria-label": ariaLabel,
        style: itemStyle,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: nodeContainerStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                style: nodeStyle,
                "aria-label": status === "success" ? "Completed" : status === "error" ? "Error" : status === "active" ? "In progress" : "Pending",
                children: Icon2 ? /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 14, strokeWidth: status === "active" ? 2 : 2.5 }) : /* @__PURE__ */ jsxRuntime.jsx("div", { style: innerDotStyle })
              }
            ),
            !isLast && /* @__PURE__ */ jsxRuntime.jsx("div", { style: connectorStyle })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
            title && /* @__PURE__ */ jsxRuntime.jsx("h4", { style: titleStyle, children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx("p", { style: descriptionStyle, children: description }),
            time && /* @__PURE__ */ jsxRuntime.jsx("p", { style: timeStyle, children: time }),
            children
          ] })
        ]
      }
    );
  }
);
TimelineItem.displayName = "TimelineItem";
var CHIP_TOKENS = {
  // Variants
  variants: {
    filled: {
      bg: "#ffffff",
      // white
      bgHover: "#f4f4f5",
      // zinc-100
      bgActive: "#e4e4e7",
      // zinc-200
      bgSelected: "#dbeafe",
      // blue-100 (light blue)
      bgSelectedHover: "#bfdbfe",
      // blue-200
      fg: "#18181b",
      // zinc-900
      fgSelected: "#2050f6"
      // spaceblue-600
    },
    outlined: {
      bg: "transparent",
      bgHover: "#f4f4f5",
      // zinc-100
      bgActive: "#e4e4e7",
      // zinc-200
      bgSelected: "#eef4ff",
      // spaceblue-50
      bgSelectedHover: "#dbeafe",
      // blue-100
      border: "#d4d4d8",
      // zinc-300
      borderHover: "#a1a1aa",
      // zinc-400
      borderSelected: "#2050f6",
      fg: "#18181b",
      fgSelected: "#2050f6"
    }
  },
  disabled: {
    bg: "#f4f4f5",
    border: "#e4e4e7",
    fg: "#a1a1aa"
  },
  // Sizes
  sizes: {
    sm: { height: 24, paddingX: 8, fontSize: 12, iconSize: 14, gap: 4 },
    md: { height: 32, paddingX: 12, fontSize: 14, iconSize: 16, gap: 6 }
  },
  radius: 9999,
  // Pill shape
  // Focus ring
  focusRing: "0 0 0 3px rgba(32, 80, 246, 0.2)"
};
var Chip = React2.forwardRef(
  ({
    variant = "filled",
    size = "md",
    selected = false,
    active = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightElement,
    count,
    showDivider = false,
    onClick,
    onRemove,
    onFocus,
    onBlur,
    style,
    children,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2.useState(false);
    const [isFocused, setIsFocused] = React2.useState(false);
    const tokens = CHIP_TOKENS.variants[variant];
    const sizeTokens = CHIP_TOKENS.sizes[size];
    const getBgColor = () => {
      if (disabled) return CHIP_TOKENS.disabled.bg;
      if (selected) {
        return isHovered ? tokens.bgSelectedHover : tokens.bgSelected;
      }
      if (active) return tokens.bgActive;
      if (isHovered) return tokens.bgHover;
      return tokens.bg;
    };
    const getFgColor = () => {
      if (disabled) return CHIP_TOKENS.disabled.fg;
      if (selected) return tokens.fgSelected;
      return tokens.fg;
    };
    const getBorderColor = () => {
      if (variant !== "outlined") return "transparent";
      if (disabled) return CHIP_TOKENS.disabled.border;
      if (selected) return tokens.borderSelected;
      if (isHovered) return tokens.borderHover;
      return tokens.border;
    };
    const chipStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: sizeTokens.gap,
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: rightElement ? sizeTokens.gap : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: getBgColor(),
      color: getFgColor(),
      border: `1px solid ${getBorderColor()}`,
      borderRadius: CHIP_TOKENS.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "all 150ms ease-in-out",
      outline: "none",
      boxShadow: isFocused && !disabled ? CHIP_TOKENS.focusRing : "none",
      ...style
    };
    const dividerStyle = {
      width: 1,
      height: sizeTokens.height - 8,
      backgroundColor: variant === "outlined" && selected ? "#2050f6" : "#d4d4d8",
      margin: "0 4px"
    };
    const rightElementStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      marginRight: -sizeTokens.gap,
      color: "inherit"
    };
    const removeButtonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: sizeTokens.height - 8,
      height: sizeTokens.height - 8,
      padding: 0,
      background: "none",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      color: "inherit",
      opacity: 0.6,
      transition: "opacity 150ms ease-in-out"
    };
    const handleClick = () => {
      if (!disabled) onClick?.();
    };
    const handleRemove = (e) => {
      e.stopPropagation();
      if (!disabled) onRemove?.();
    };
    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const renderRightElement = () => {
      if (!rightElement) return null;
      if (rightElement === "remove") {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          showDivider && /* @__PURE__ */ jsxRuntime.jsx("span", { style: dividerStyle }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              role: "button",
              tabIndex: -1,
              style: removeButtonStyle,
              onClick: handleRemove,
              onMouseOver: (e) => e.currentTarget.style.opacity = "1",
              onMouseOut: (e) => e.currentTarget.style.opacity = "0.6",
              "aria-label": "Remove",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: sizeTokens.iconSize - 2 })
            }
          )
        ] });
      }
      if (rightElement === "dropdown") {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          showDivider && /* @__PURE__ */ jsxRuntime.jsx("span", { style: dividerStyle }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: rightElementStyle, children: active ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { size: sizeTokens.iconSize - 2 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: sizeTokens.iconSize - 2 }) })
        ] });
      }
      if (rightElement === "count" && count !== void 0) {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          showDivider && /* @__PURE__ */ jsxRuntime.jsx("span", { style: dividerStyle }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { style: rightElementStyle, children: [
            "(",
            count,
            ")"
          ] })
        ] });
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        showDivider && /* @__PURE__ */ jsxRuntime.jsx("span", { style: dividerStyle }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { style: rightElementStyle, children: rightElement })
      ] });
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        style: chipStyle,
        disabled,
        onClick: handleClick,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        "aria-pressed": selected,
        "aria-expanded": active,
        ...props,
        children: [
          LeftIcon && /* @__PURE__ */ jsxRuntime.jsx(LeftIcon, { size: sizeTokens.iconSize }),
          children,
          renderRightElement()
        ]
      }
    );
  }
);
Chip.displayName = "Chip";
var ChipGroup = React2.forwardRef(
  ({ value, onValueChange, multiple = false, style, children, ...props }, ref) => {
    const groupStyle = {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "group", style: groupStyle, ...props, children });
  }
);
ChipGroup.displayName = "ChipGroup";
var LINK_TOKENS = {
  // Single color scheme (no variants per designer feedback)
  color: "#2050f6",
  // spaceblue-600
  colorHover: "#1337e2",
  // spaceblue-700
  colorActive: "#162eb7",
  // spaceblue-800
  colorFocus: "#2050f6",
  // Same as default
  // Focus ring
  focusRing: "0 0 0 2px rgba(32, 80, 246, 0.25)",
  // Disabled
  disabled: {
    color: "#a1a1aa",
    // zinc-400
    cursor: "not-allowed"
  }
};
var Link = React2.forwardRef(
  ({
    underline = "hover",
    external = false,
    disabled = false,
    size = "inherit",
    href,
    target,
    rel,
    style,
    children,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2__namespace.useState(false);
    const [isActive, setIsActive] = React2__namespace.useState(false);
    const [isFocused, setIsFocused] = React2__namespace.useState(false);
    const getColor = () => {
      if (disabled) return LINK_TOKENS.disabled.color;
      if (isActive) return LINK_TOKENS.colorActive;
      if (isHovered) return LINK_TOKENS.colorHover;
      if (isFocused) return LINK_TOKENS.colorFocus;
      return LINK_TOKENS.color;
    };
    const getTextDecoration = () => {
      if (underline === "always") return "underline";
      if (underline === "hover" && isHovered) return "underline";
      return "none";
    };
    const getFontSize = () => {
      if (size === "inherit") return "inherit";
      if (size === "sm") return 12;
      if (size === "md") return 14;
      if (size === "lg") return 16;
      return "inherit";
    };
    const isExternalLink = external || href && (href.startsWith("http") || href.startsWith("//"));
    const linkTarget = target || (isExternalLink ? "_blank" : void 0);
    const linkRel = rel || (isExternalLink ? "noopener noreferrer" : void 0);
    const linkStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: getColor(),
      fontSize: getFontSize(),
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textDecoration: getTextDecoration(),
      textUnderlineOffset: 2,
      cursor: disabled ? LINK_TOKENS.disabled.cursor : "pointer",
      transition: "color 150ms ease-in-out, box-shadow 150ms ease-in-out",
      outline: "none",
      borderRadius: 2,
      boxShadow: isFocused && !disabled ? LINK_TOKENS.focusRing : "none",
      padding: "1px 2px",
      margin: "-1px -2px",
      ...style
    };
    const handleClick = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      props.onClick?.(e);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "a",
      {
        ref,
        href: disabled ? void 0 : href,
        target: linkTarget,
        rel: linkRel,
        style: linkStyle,
        onClick: handleClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => {
          setIsHovered(false);
          setIsActive(false);
        },
        onMouseDown: () => setIsActive(true),
        onMouseUp: () => setIsActive(false),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        "aria-disabled": disabled,
        ...props,
        children: [
          children,
          isExternalLink && external && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ExternalLink, { size: size === "sm" ? 12 : size === "lg" ? 16 : 14 })
        ]
      }
    );
  }
);
Link.displayName = "Link";
var PROPERTY_CARD_TOKENS = {
  // Card - image goes edge-to-edge, only content has padding
  card: {
    bg: "#ffffff",
    border: "#e4e4e7",
    radius: 16,
    shadow: "0 1px 3px rgba(0,0,0,0.08)",
    shadowHover: "0 8px 24px rgba(0,0,0,0.12)",
    contentPadding: 20
  },
  // Image - edge-to-edge, radius only on top
  image: {
    height: 200,
    radiusTop: 16
  },
  // Type badge (on image, top-left)
  typeBadge: {
    bg: "#18181b",
    // Dark grey per Figma
    fg: "#ffffff",
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    radius: 20
  },
  // Value added labels (on image, max 2)
  valueLabel: {
    offMarket: { bg: "#18181b", fg: "#ffffff", label: "Off market" },
    highYield: { bg: "#16a34a", fg: "#ffffff", label: "High yield" },
    newConstruction: { bg: "#2050f6", fg: "#ffffff", label: "New Construction" },
    highValue: { bg: "#f59e0b", fg: "#ffffff", label: "High Value" }
  },
  // Status badge (inline with title)
  status: {
    available: { bg: "#dcfce7", fg: "#15803d", border: "#86efac", label: "Available" },
    reserved: { bg: "#fef3c7", fg: "#b45309", border: "#fcd34d", label: "Reserved" },
    sold: { bg: "#ffffff", fg: "#71717a", border: "#e4e4e7", label: "Sold" },
    comingSoon: { bg: "#e0e7ff", fg: "#4338ca", border: "#c7d2fe", label: "Coming Soon" }
  },
  // Title
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: "#18181b",
    lineHeight: 1.3
  },
  // Location
  location: {
    fontSize: 14,
    color: "#71717a"
  },
  // Feature pills
  featurePill: {
    height: 36,
    paddingX: 14,
    fontSize: 14,
    fontWeight: 500,
    color: "#3f3f46",
    bg: "#ffffff",
    border: "#e4e4e7",
    radius: 8,
    gap: 8
  },
  // Price labels
  priceLabel: {
    fontSize: 14,
    color: "#71717a"
  },
  // Price value
  priceValue: {
    fontSize: 28,
    fontWeight: 700,
    color: "#18181b"
  },
  // Net yield - GREEN per Figma
  yieldValue: {
    fontSize: 28,
    fontWeight: 700,
    color: "#16a34a"
    // Green color per Figma
  },
  // Info rows
  infoRow: {
    fontSize: 16,
    labelColor: "#71717a",
    valueColor: "#18181b",
    valueWeight: 500
  },
  // Delivery info (for projects)
  delivery: {
    fontSize: 14,
    color: "#71717a"
  }
};
var PropertyCard = React2.forwardRef(
  ({
    image,
    type,
    title,
    status,
    valueLabels = [],
    location,
    category,
    bedrooms,
    bathrooms,
    area,
    price,
    currency = "\u20AC",
    yieldPercent,
    infoRows = [],
    deliveryDate,
    constructionStatus,
    showFavorite = false,
    isFavorite = false,
    onFavoriteChange,
    onCardClick,
    loading = false,
    style,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React2.useState(false);
    const [favorite, setFavorite] = React2.useState(isFavorite);
    const handleFavoriteClick = (e) => {
      e.stopPropagation();
      const newValue = !favorite;
      setFavorite(newValue);
      onFavoriteChange?.(newValue);
    };
    const formatPrice = (value) => {
      return value.toLocaleString("es-ES");
    };
    const displayValueLabels = valueLabels.slice(0, 2);
    if (loading) {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          style: {
            backgroundColor: PROPERTY_CARD_TOKENS.card.bg,
            borderRadius: PROPERTY_CARD_TOKENS.card.radius,
            border: `1px solid ${PROPERTY_CARD_TOKENS.card.border}`,
            overflow: "hidden",
            ...style
          },
          ...props,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              height: PROPERTY_CARD_TOKENS.image.height,
              backgroundColor: "#f4f4f5"
            } }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { padding: PROPERTY_CARD_TOKENS.card.contentPadding }, children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 16, width: "80%", backgroundColor: "#f4f4f5", borderRadius: 4, marginBottom: 8 } }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 12, width: "50%", backgroundColor: "#f4f4f5", borderRadius: 3, marginBottom: 12 } }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", gap: 8, marginBottom: 12 }, children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 36, width: 80, backgroundColor: "#f4f4f5", borderRadius: 8 } }, i)) }),
              [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 }, children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 12, width: "40%", backgroundColor: "#f4f4f5", borderRadius: 3 } }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 12, width: "25%", backgroundColor: "#f4f4f5", borderRadius: 3 } })
              ] }, i))
            ] })
          ]
        }
      );
    }
    const cardStyle = {
      backgroundColor: PROPERTY_CARD_TOKENS.card.bg,
      borderRadius: PROPERTY_CARD_TOKENS.card.radius,
      border: `1px solid ${PROPERTY_CARD_TOKENS.card.border}`,
      boxShadow: isHovered ? PROPERTY_CARD_TOKENS.card.shadowHover : PROPERTY_CARD_TOKENS.card.shadow,
      overflow: "hidden",
      cursor: onCardClick ? "pointer" : "default",
      transition: "box-shadow 200ms ease, transform 200ms ease",
      transform: isHovered ? "translateY(-2px)" : "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style
    };
    const imageContainerStyle = {
      position: "relative",
      height: PROPERTY_CARD_TOKENS.image.height,
      overflow: "hidden"
    };
    const imageStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      display: "block"
    };
    const isSold = status === "sold";
    const isProject = type === "Project";
    const typeBadgeStyle = {
      position: "absolute",
      top: 12,
      left: 12,
      padding: PROPERTY_CARD_TOKENS.typeBadge.padding,
      fontSize: PROPERTY_CARD_TOKENS.typeBadge.fontSize,
      fontWeight: PROPERTY_CARD_TOKENS.typeBadge.fontWeight,
      backgroundColor: PROPERTY_CARD_TOKENS.typeBadge.bg,
      color: PROPERTY_CARD_TOKENS.typeBadge.fg,
      borderRadius: PROPERTY_CARD_TOKENS.typeBadge.radius,
      zIndex: 2
    };
    const getValueLabelStyle = (label) => {
      const tokens = PROPERTY_CARD_TOKENS.valueLabel[label];
      return {
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        borderRadius: 9999,
        // Pill shape - fully rounded ends
        whiteSpace: "nowrap",
        display: "inline-block"
      };
    };
    const getStatusStyle = (s) => {
      const tokens = PROPERTY_CARD_TOKENS.status[s];
      return {
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        border: `1px solid ${tokens.border}`,
        borderRadius: 6,
        whiteSpace: "nowrap"
      };
    };
    const favoriteButtonStyle = {
      position: "absolute",
      top: 12,
      right: 12,
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 2,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    };
    const contentStyle = {
      padding: PROPERTY_CARD_TOKENS.card.contentPadding
    };
    const featurePillStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: PROPERTY_CARD_TOKENS.featurePill.gap,
      height: PROPERTY_CARD_TOKENS.featurePill.height,
      padding: `0 ${PROPERTY_CARD_TOKENS.featurePill.paddingX}px`,
      fontSize: PROPERTY_CARD_TOKENS.featurePill.fontSize,
      fontWeight: PROPERTY_CARD_TOKENS.featurePill.fontWeight,
      color: PROPERTY_CARD_TOKENS.featurePill.color,
      border: `1px solid ${PROPERTY_CARD_TOKENS.featurePill.border}`,
      borderRadius: PROPERTY_CARD_TOKENS.featurePill.radius,
      backgroundColor: PROPERTY_CARD_TOKENS.featurePill.bg
    };
    const hasFeatures = category || bedrooms !== void 0 || bathrooms !== void 0 || area !== void 0;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        style: cardStyle,
        onClick: onCardClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        role: "article",
        "aria-label": `Property: ${title}`,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: imageContainerStyle, children: [
            image ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: image, alt: title, style: imageStyle }) : /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              ...imageStyle,
              backgroundColor: "#f4f4f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Building, { size: 48, color: "#d4d4d8" }) }),
            type && /* @__PURE__ */ jsxRuntime.jsx("span", { style: typeBadgeStyle, children: type }),
            displayValueLabels.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              position: "absolute",
              top: 12,
              left: type ? 110 : 12,
              display: "flex",
              gap: 6,
              zIndex: 2
            }, children: displayValueLabels.map((label) => /* @__PURE__ */ jsxRuntime.jsx("span", { style: getValueLabelStyle(label), children: PROPERTY_CARD_TOKENS.valueLabel[label].label }, label)) }),
            showFavorite && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                style: favoriteButtonStyle,
                onClick: handleFavoriteClick,
                "aria-label": favorite ? "Remove from favorites" : "Add to favorites",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.Heart,
                  {
                    size: 18,
                    fill: favorite ? "#ef4444" : "none",
                    color: favorite ? "#ef4444" : "#71717a"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentStyle, children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }, children: [
              /* @__PURE__ */ jsxRuntime.jsx("h3", { style: {
                margin: 0,
                fontSize: PROPERTY_CARD_TOKENS.title.fontSize,
                fontWeight: PROPERTY_CARD_TOKENS.title.fontWeight,
                color: PROPERTY_CARD_TOKENS.title.color,
                lineHeight: PROPERTY_CARD_TOKENS.title.lineHeight,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }, children: title }),
              status && /* @__PURE__ */ jsxRuntime.jsx("span", { style: getStatusStyle(status), children: PROPERTY_CARD_TOKENS.status[status].label })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              fontSize: PROPERTY_CARD_TOKENS.location.fontSize,
              color: PROPERTY_CARD_TOKENS.location.color,
              marginBottom: 16
            }, children: location }),
            isProject && (deliveryDate || constructionStatus) ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
              fontSize: PROPERTY_CARD_TOKENS.delivery.fontSize,
              color: PROPERTY_CARD_TOKENS.delivery.color,
              marginBottom: 20
            }, children: [
              deliveryDate && `Delivery: ${deliveryDate}`,
              deliveryDate && constructionStatus && " \xB7 ",
              constructionStatus && `Status: ${constructionStatus}`
            ] }) : hasFeatures ? /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }, children: [
              category && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: featurePillStyle, children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Home, { size: 16 }),
                category
              ] }),
              bedrooms !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: featurePillStyle, children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Bed, { size: 16 }),
                bedrooms,
                " beds"
              ] }),
              bathrooms !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: featurePillStyle, children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Bath, { size: 16 }),
                bathrooms,
                " baths"
              ] }),
              area !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { style: featurePillStyle, children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Maximize, { size: 16 }),
                area,
                " m\xB2"
              ] })
            ] }) : null,
            /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
              display: "flex",
              gap: 32,
              marginBottom: 20,
              opacity: isSold ? 0.5 : 1
            }, children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
                  fontSize: PROPERTY_CARD_TOKENS.priceLabel.fontSize,
                  color: PROPERTY_CARD_TOKENS.priceLabel.color,
                  marginBottom: 4
                }, children: "Purchase price" }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
                  fontSize: PROPERTY_CARD_TOKENS.priceValue.fontSize,
                  fontWeight: PROPERTY_CARD_TOKENS.priceValue.fontWeight,
                  color: isSold ? "#71717a" : PROPERTY_CARD_TOKENS.priceValue.color
                }, children: [
                  formatPrice(price),
                  " ",
                  currency
                ] })
              ] }),
              yieldPercent !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
                  fontSize: PROPERTY_CARD_TOKENS.priceLabel.fontSize,
                  color: PROPERTY_CARD_TOKENS.priceLabel.color,
                  marginBottom: 4
                }, children: "Net yield" }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
                  fontSize: PROPERTY_CARD_TOKENS.yieldValue.fontSize,
                  fontWeight: PROPERTY_CARD_TOKENS.yieldValue.fontWeight,
                  color: isSold ? "#71717a" : PROPERTY_CARD_TOKENS.yieldValue.color
                }, children: [
                  yieldPercent,
                  " %"
                ] })
              ] })
            ] }),
            infoRows.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
              borderTop: "1px solid #e4e4e7",
              paddingTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: isSold ? 0.5 : 1
            }, children: infoRows.map((row, index) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: PROPERTY_CARD_TOKENS.infoRow.fontSize
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { style: {
                    color: PROPERTY_CARD_TOKENS.infoRow.labelColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }, children: [
                    row.label,
                    row.hasInfo && /* @__PURE__ */ jsxRuntime.jsx(
                      lucideReact.Info,
                      {
                        size: 16,
                        style: { opacity: 0.5 },
                        "aria-label": "More information"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
                    color: row.value === null || row.value === "\u2014" || row.value === "XXXXX" ? "#a1a1aa" : isSold ? "#a1a1aa" : PROPERTY_CARD_TOKENS.infoRow.valueColor,
                    fontWeight: PROPERTY_CARD_TOKENS.infoRow.valueWeight
                  }, children: row.value === null ? "\u2014" : row.value })
                ]
              },
              index
            )) })
          ] })
        ]
      }
    );
  }
);
PropertyCard.displayName = "PropertyCard";
var PropertyCardGrid = React2.forwardRef(
  ({ columns = 3, gap = 24, style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          ...style
        },
        ...props,
        children
      }
    );
  }
);
PropertyCardGrid.displayName = "PropertyCardGrid";
function cn3(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

exports.ACCORDION_TOKENS = ACCORDION_TOKENS;
exports.ALERT_TOKENS = ALERT_TOKENS;
exports.AUTOCOMPLETE_TOKENS = AUTOCOMPLETE_TOKENS;
exports.AVATAR_TOKENS = AVATAR_TOKENS;
exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertTitle = AlertTitle;
exports.Autocomplete = Autocomplete;
exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.BADGE_TOKENS = BADGE_TOKENS;
exports.BANNER_TOKENS = BANNER_TOKENS;
exports.BOTTOM_NAV_TOKENS = BOTTOM_NAV_TOKENS;
exports.BREADCRUMB_TOKENS = BREADCRUMB_TOKENS;
exports.BUTTON_TOKENS = BUTTON_TOKENS;
exports.Badge = Badge;
exports.BadgeContainer = BadgeContainer;
exports.Banner = Banner;
exports.BottomNav = BottomNav;
exports.BottomNavItem = BottomNavItem;
exports.BottomNavSearch = BottomNavSearch;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbHome = BreadcrumbHome;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.Button = Button;
exports.CALENDAR_TOKENS = CALENDAR_TOKENS;
exports.CARD_TOKENS = CARD_TOKENS;
exports.CAROUSEL_TOKENS = CAROUSEL_TOKENS;
exports.CHECKBOX_TOKENS = CHECKBOX_TOKENS;
exports.CHIP_TOKENS = CHIP_TOKENS;
exports.COLOR_PICKER_TOKENS = COLOR_PICKER_TOKENS;
exports.COMBOBOX_TOKENS = COMBOBOX_TOKENS;
exports.CONTEXT_MENU_TOKENS = CONTEXT_MENU_TOKENS;
exports.COUNTRY_CODES = COUNTRY_CODES;
exports.Calendar = Calendar;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardHeaderTitle = CardHeaderTitle;
exports.CardTitle = CardTitle;
exports.Carousel = Carousel;
exports.CarouselItem = CarouselItem;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Chip = Chip;
exports.ChipGroup = ChipGroup;
exports.ColorPicker = ColorPicker;
exports.Combobox = Combobox;
exports.ContextMenu = ContextMenu;
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
exports.ContextMenuContent = ContextMenuContent;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuLabel = ContextMenuLabel;
exports.ContextMenuRadioItem = ContextMenuRadioItem;
exports.ContextMenuSeparator = ContextMenuSeparator;
exports.ContextMenuSubmenu = ContextMenuSubmenu;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.DATA_BLOCK_TOKENS = DATA_BLOCK_TOKENS;
exports.DATE_PICKER_TOKENS = DATE_PICKER_TOKENS;
exports.DIALOG_TOKENS = DIALOG_TOKENS;
exports.DIVIDER_TOKENS = DIVIDER_TOKENS;
exports.DROPDOWN_TOKENS = DROPDOWN_TOKENS;
exports.DataBlock = DataBlock;
exports.DataBlockGrid = DataBlockGrid;
exports.DatePicker = DatePicker;
exports.Dialog = Dialog;
exports.DialogBody = DialogBody;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.Divider = Divider;
exports.DividerWithLabel = DividerWithLabel;
exports.DotBadge = DotBadge;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.EMPTY_STATE_TOKENS = EMPTY_STATE_TOKENS;
exports.EmptyState = EmptyState;
exports.FILE_UPLOAD_TOKENS = FILE_UPLOAD_TOKENS;
exports.FOOTER_ACTIONS_TOKENS = FOOTER_ACTIONS_TOKENS;
exports.FileUpload = FileUpload;
exports.FooterActions = FooterActions;
exports.FooterCopyright = FooterCopyright;
exports.FooterLink = FooterLink;
exports.FooterSection = FooterSection;
exports.FullPagination = FullPagination;
exports.HEADER_TOKENS = HEADER_TOKENS;
exports.INPUT_TOKENS = INPUT_TOKENS;
exports.ITEM_TOKENS = ITEM_TOKENS;
exports.Input = Input;
exports.Item = Item2;
exports.LIGHTBOX_TOKENS = LIGHTBOX_TOKENS;
exports.LINK_TOKENS = LINK_TOKENS;
exports.LIST_ITEM_TOKENS = ITEM_TOKENS;
exports.Lightbox = Lightbox;
exports.LightboxTrigger = LightboxTrigger;
exports.Link = Link;
exports.List = List;
exports.ListItem = Item2;
exports.MEDIA_HERO_TOKENS = MEDIA_HERO_TOKENS;
exports.MediaHero = MediaHero;
exports.NAVBAR_TOKENS = NAVBAR_TOKENS;
exports.NUMBER_INPUT_TOKENS = NUMBER_INPUT_TOKENS;
exports.NUMBER_STEPPER_TOKENS = NUMBER_STEPPER_TOKENS;
exports.Navbar = Navbar;
exports.NavbarActions = NavbarActions;
exports.NavbarBack = NavbarBack;
exports.NavbarBrand = NavbarBrand;
exports.NavbarButton = NavbarButton;
exports.NavbarTitle = NavbarTitle;
exports.NumberInput = NumberInput;
exports.NumberStepper = NumberStepper;
exports.PAGINATION_TOKENS = PAGINATION_TOKENS;
exports.PHONE_INPUT_TOKENS = PHONE_INPUT_TOKENS;
exports.PIN_CODE_TOKENS = PIN_CODE_TOKENS;
exports.POPOVER_TOKENS = POPOVER_TOKENS;
exports.PRESET_COLORS = PRESET_COLORS;
exports.PROGRESS_TOKENS = PROGRESS_TOKENS;
exports.PROPERTY_CARD_TOKENS = PROPERTY_CARD_TOKENS;
exports.PageFooter = PageFooter;
exports.PageHeader = PageHeader;
exports.Pagination = Pagination;
exports.PaginationButton = PaginationButton;
exports.PaginationEllipsis = PaginationEllipsis;
exports.PhoneInput = PhoneInput;
exports.PinCode = PinCode;
exports.Popover = Popover;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.ProgressBar = ProgressBar;
exports.ProgressCircle = ProgressCircle;
exports.PromoBanner = PromoBanner;
exports.PropertyCard = PropertyCard;
exports.PropertyCardGrid = PropertyCardGrid;
exports.RADIO_TOKENS = RADIO_TOKENS;
exports.RATING_TOKENS = RATING_TOKENS;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.RangeSlider = RangeSlider;
exports.Rating = Rating;
exports.RatingDisplay = RatingDisplay;
exports.SEARCH_INPUT_TOKENS = SEARCH_INPUT_TOKENS;
exports.SELECT_TOKENS = SELECT_TOKENS;
exports.SHEET_TOKENS = SHEET_TOKENS;
exports.SIDE_NAV_TOKENS = SIDE_NAV_TOKENS;
exports.SKELETON_TOKENS = SKELETON_TOKENS;
exports.SLIDER_TOKENS = SLIDER_TOKENS;
exports.STEPPER_TOKENS = STEPPER_TOKENS;
exports.SWITCH_TOKENS = SWITCH_TOKENS;
exports.SearchInput = SearchInput;
exports.SectionHeader = SectionHeader;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Sheet = Sheet;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
exports.SideNav = SideNav;
exports.SideNavDivider = SideNavDivider;
exports.SideNavGroup = SideNavGroup;
exports.SideNavItem = SideNavItem;
exports.Skeleton = Skeleton;
exports.SkeletonAvatar = SkeletonAvatar;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonText = SkeletonText;
exports.Slider = Slider;
exports.Stepper = Stepper;
exports.StepperStep = StepperStep;
exports.Switch = Switch;
exports.TABLE_TOKENS = TABLE_TOKENS;
exports.TABS_TOKENS = TABS_TOKENS;
exports.TAG_INPUT_TOKENS = TAG_INPUT_TOKENS;
exports.TAG_TOKENS = TAG_TOKENS;
exports.TEXT_TOKENS = TEXT_TOKENS;
exports.TIMELINE_TOKENS = TIMELINE_TOKENS;
exports.TOAST_TOKENS = TOAST_TOKENS;
exports.TOGGLE_GROUP_TOKENS = TOGGLE_GROUP_TOKENS;
exports.TOOLTIP_TOKENS = TOOLTIP_TOKENS;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TablePagination = TablePagination;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Tag = Tag;
exports.TagInput = TagInput;
exports.Text = Text;
exports.Textarea = Textarea;
exports.Timeline = Timeline;
exports.TimelineItem = TimelineItem;
exports.ToastProvider = ToastProvider;
exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
exports.UPLOADER_TOKENS = UPLOADER_TOKENS;
exports.Uploader = Uploader;
exports.cn = cn3;
exports.useToast = useToast;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map