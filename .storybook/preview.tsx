export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// import { StoryContext } from '@storybook/react';

// /**
//  * Add global context for RTL-LTR switching
//  */
// export const globalTypes = {
//   direction: {
//     name: 'Direction',
//     description: 'Direction for layout',
//     defaultValue: 'LTR',
//     toolbar: {
//       icon: 'globe',
//       items: ['LTR', 'RTL'],
//     },
//   },
// };

// const withChakra = (StoryFn: Function, context: StoryContext) => {
//   const { direction } = context.globals;
//   const dir = direction.toLowerCase();

//   return (
//     <ChakraProvider theme={extendTheme({ direction: dir })}>
//       <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
//         <StoryFn />
//       </div>
//     </ChakraProvider>
//   );
// };

// export const decorators = [withChakra];
