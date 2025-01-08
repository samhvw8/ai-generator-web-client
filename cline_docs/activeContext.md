# Active Context

## Current Task
Documentation and memory bank updates

## Recent Changes
1. Updated project README.md with:
   - Comprehensive feature list
   - Tech stack details
   - Installation instructions
   - Project structure
   - Development guidelines
2. Previous changes:
   - Extracted cookie utilities to `src/services/cookieUtils.ts`
   - Created `ImageService` interface in `src/services/imageService.ts`
   - Implemented service classes:
     - `OpenAiImageService`: Handles OpenAI API integration
     - `NekoImageService`: Handles Neko API integration
   - Added backward compatibility layer with default service instance

## Potential Issues
- Need to test Neko API integration when endpoint is available
- May need to handle different error formats from different providers
- Might need to normalize model names across providers

## Next Steps
1. Test Neko API integration when endpoint is ready
2. Add service switching capability if needed
3. Consider adding error normalization across providers
4. Add retry logic for failed requests
5. Implement remaining features from progress.md:
   - Add loading state for individual images
   - Add image download capability
   - Consider adding prompt history/favorites