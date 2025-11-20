/**
 * Shared responsive styles for lesson question components
 * These classes ensure consistent, responsive layouts across all question types
 */

export const sharedStyles = {
  // Container styles
  container: "w-full space-y-4 md:space-y-6",
  
  // Typography - responsive text sizes
  title: "text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3",
  question: "text-base md:text-lg lg:text-xl font-semibold text-white mb-4 md:mb-6",
  body: "text-base md:text-lg text-slate-300 leading-relaxed",
  description: "text-sm md:text-base text-slate-400 mb-4",
  
  // Card/Button styles
  card: "rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all duration-200 border border-slate-600",
  button: "rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800",
  
  // Grid layouts
  grid1Col: "grid grid-cols-1 gap-3 md:gap-4",
  grid2Col: "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4",
  grid3Col: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4",
  
  // Flex layouts
  flexCol: "flex flex-col gap-3 md:gap-4",
  flexRow: "flex flex-col md:flex-row gap-3 md:gap-4",
  flexCenter: "flex items-center justify-center",
  
  // Spacing
  spacing: {
    xs: "p-3 md:p-4",
    sm: "p-4 md:p-5",
    md: "p-5 md:p-6",
    lg: "p-6 md:p-8",
  },
  
  // Image styles
  image: "w-full h-auto max-w-xs mx-auto md:max-w-sm lg:max-w-md rounded-lg",
  imageContainer: "flex items-center justify-center mb-4 md:mb-6",
  
  // Text alignment
  textCenter: "text-center md:text-left",
  textLeft: "text-left",
  textRight: "text-right",
  
  // Option/Choice styles
  option: "p-4 md:p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200 cursor-pointer text-left",
  optionSelected: "bg-blue-600/20 border-blue-500",
  optionCorrect: "bg-green-600/20 border-green-500",
  optionIncorrect: "bg-red-600/20 border-red-500",
  
  // Input styles
  input: "w-full px-4 py-3 md:py-4 rounded-xl bg-slate-700 border-2 border-slate-600 focus:border-blue-500 focus:outline-none text-white text-base md:text-lg",
  
  // Drag and drop styles
  dragItem: "p-4 md:p-5 rounded-xl bg-slate-700 border-2 border-slate-600 cursor-move transition-all duration-200",
  dragItemDragging: "opacity-50 scale-95",
  dropZone: "min-h-[100px] rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50 p-4",
  
  // Match pair styles
  matchContainer: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
  matchItem: "p-4 md:p-5 rounded-xl bg-slate-700 border-2 border-slate-600 cursor-pointer transition-all duration-200",
  matchItemMatched: "bg-green-600/20 border-green-500",
  
  // Order list styles
  orderList: "space-y-3 md:space-y-4",
  orderItem: "p-4 md:p-5 rounded-xl bg-slate-700 border-2 border-slate-600 cursor-move transition-all duration-200",
  
  // Fill blanks styles
  blankText: "inline-block",
  blankInput: "inline-block min-w-[120px] md:min-w-[150px] px-3 py-2 md:py-3 rounded-lg bg-slate-700 border-2 border-slate-600 focus:border-blue-500 focus:outline-none text-white text-base md:text-lg mx-1",
  
  // Feedback styles
  feedback: "mt-4 md:mt-6 p-4 md:p-5 rounded-xl",
  feedbackCorrect: "bg-green-600/20 border border-green-500 text-green-300",
  feedbackIncorrect: "bg-red-600/20 border border-red-500 text-red-300",
  feedbackInfo: "bg-blue-600/20 border border-blue-500 text-blue-300",
  
  // Loading/Disabled states
  disabled: "opacity-50 cursor-not-allowed",
  loading: "animate-pulse",
}

/**
 * Responsive text size utilities
 */
export const textSizes = {
  xs: "text-xs md:text-sm",
  sm: "text-sm md:text-base",
  base: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
  "2xl": "text-2xl md:text-3xl",
}

/**
 * Responsive spacing utilities
 */
export const spacing = {
  xs: "gap-2 md:gap-3",
  sm: "gap-3 md:gap-4",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  xl: "gap-8 md:gap-10",
}

