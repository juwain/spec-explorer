# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 specification explorer application that allows users to browse, search, and filter web specifications. The app fetches specification data from the W3C webref repository and provides an interface for exploring technical specifications with favorites functionality.

## Development Commands

- `npm run serve` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check and fix code style

## Architecture

### Core Structure
- **Vue 3** with Composition API
- **Vue Router 4** for navigation
- **Vuex 4** for state management with localStorage persistence
- **Vue CLI 4** for build tooling

### Key Directories
- `src/views/` - Main application pages (Home, Favourites, Inner spec details)
- `src/components/` - Reusable UI components (Explorer, Specification, FilterTabs, etc.)
- `src/composables/hooks/` - Vue 3 composition hooks for data management
- `src/composables/computed/` - Computed properties for data transformation
- `src/service/` - Constants, enums, and utilities
- `src/store/` - Vuex store configuration

### Data Flow
1. Specification data fetched from W3C webref API (constants.js:1-2)
2. Main explorer uses `useSpecifications()` hook for data management
3. Individual specs use `useSpecificationData()` hook for detailed data
4. Filter/search handled by specialized hooks (`useDataFilter`, `useDataSearch`, `useDataSorter`)
5. Favorites managed through Vuex store with localStorage persistence

### Key Hooks
- `useSpecificationData()` - Fetches individual specification details
- `useSpecifications()` - Manages main specification list
- `useFavourites()` - Handles favorites functionality
- `useDataFilter()`, `useDataSearch()`, `useDataSorter()` - Data manipulation

### Routing
- `/` - Home view with specification explorer
- `/spec/:id` - Individual specification details
- `/favourites` - Saved specifications

## API Integration

The application fetches data from:
- Index endpoint: `indexURL` (constants.js:1)
- Specification details: `specURL/{id}.json` (constants.js:2)

Both endpoints point to the W3C webref repository master branch.