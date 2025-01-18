# API Integration Documentation

    This document outlines the structure of the project and identifies areas where API integration is required.

    ## Project Structure

    The project is a React application built using Vite, TypeScript, and Tailwind CSS. It utilizes the shadcn/ui library for UI components and Lucide React for icons. The project is structured as follows:

    -   `src/`: Contains the main source code for the application.
        -   `App.tsx`: The main application component that sets up routing and layout.
        -   `main.tsx`: Entry point for the React application.
        -   `index.css`: Global CSS styles, including Tailwind directives.
        -   `vite-env.d.ts`: TypeScript declaration file for Vite environment variables.
        -   `lib/`: Contains utility functions.
            -   `utils.ts`: Utility functions for class name merging.
        -   `hooks/`: Contains custom React hooks.
            -   `use-toast.ts`: Custom hook for managing toast notifications.
        -   `components/`: Contains all the React components.
            -   `Layout.tsx`: The main layout component with sidebar and header.
            -   `Requests.tsx`: Component for displaying and managing slot, extension, and cancellation requests.
            -   `CreateCompanion.tsx`: Component for creating new companion profiles.
            -   `UpdateCompanion.tsx`: Component for updating existing companion profiles.
            -   `TrackBookings.tsx`: Component for tracking and displaying booking information.
            -   `Tickets.tsx`: Component for managing and displaying support tickets.
            -   `Analytics.tsx`: Component for displaying various analytics dashboards.
            -   `analytics/`: Contains subcomponents for the analytics dashboard.
                -   `RevenueMetrics.tsx`: Displays revenue-related metrics.
                -   `BookingMetrics.tsx`: Displays booking-related metrics.
                -   `GeographicInsights.tsx`: Displays geographic insights.
                -   `PaymentInsights.tsx`: Displays payment-related insights.
                -   `CompanionMetrics.tsx`: Displays companion-related metrics.
                -   `OperationalMetrics.tsx`: Displays operational metrics.
                -   `CustomerInsights.tsx`: Displays customer-related metrics.
                -   `MarketingROI.tsx`: Displays marketing ROI metrics.
                -   `SecurityCompliance.tsx`: Displays security and compliance data.
                -   `AdvancedAnalytics.tsx`: Displays advanced analytics data.
                -   `EnvironmentalSocialMetrics.tsx`: Displays environmental and social metrics.
                -   `CustomerSatisfaction.tsx`: Displays customer satisfaction metrics.
                -   `SocietyAnalytics.tsx`: Displays society-specific analytics.
                -   `StateMap.tsx`: Displays a map of India with state-level data.
            -   `ui/`: Contains reusable UI components built with shadcn/ui.
                -   `button.tsx`: Button component.
                -   `card.tsx`: Card component.
                -   `dialog.tsx`: Dialog component.
                -   `dropdown-menu.tsx`: Dropdown menu component.
                -   `hover-card.tsx`: Hover card component.
                -   `label.tsx`: Label component.
                -   `popover.tsx`: Popover component.
                -   `select.tsx`: Select component.
                -   `separator.tsx`: Separator component.
                -   `slider.tsx`: Slider component.
                -   `switch.tsx`: Switch component.
                -   `textarea.tsx`: Textarea component.
                -   `toast.tsx`: Toast component.
                -   `accordion.tsx`: Accordion component.
                -   `aspect-ratio.tsx`: Aspect ratio component.
                -   `breadcrumb.tsx`: Breadcrumb component.
                -   `calendar.tsx`: Calendar component.
                -   `carousel.tsx`: Carousel component.
                -   `checkbox.tsx`: Checkbox component.
                -   `command.tsx`: Command component.
                -   `input.tsx`: Input component.
                -   `input-otp.tsx`: OTP Input component.
                -   `navigation-menu.tsx`: Navigation menu component.
                -   `radio-group.tsx`: Radio group component.
                -   `resizable.tsx`: Resizable panel component.
                -   `scroll-area.tsx`: Scroll area component.
                -   `skeleton.tsx`: Skeleton component.
                -   `table.tsx`: Table component.
        -   `data/`: Contains dummy data for development.
            -   `dummy.ts`: Dummy data for requests and companions.
            -   `analytics/`: Contains dummy data for analytics.
                -   `general.ts`: Dummy data for general analytics.
                -   `delhi.ts`: Dummy data for Delhi analytics.
                -   `lucknow.ts`: Dummy data for Lucknow analytics.
                -   `societies.ts`: Dummy data for societies.
        -   `index.html`: Main HTML file.
        -   `vite.config.ts`: Vite configuration file.
        -   `postcss.config.js`: PostCSS configuration file.
        -   `tailwind.config.js`: Tailwind CSS configuration file.
        -   `tsconfig.json`: TypeScript configuration file.
        -   `package.json`: Project dependencies and scripts.
        -   `package-lock.json`: Lock file for dependencies.
        -   `eslint.config.js`: ESLint configuration file.
        -   `tsconfig.app.json`: TypeScript configuration file for the app.
        -   `tsconfig.node.json`: TypeScript configuration file for node.
        -   `.gitignore`: Git ignore file.
        -   `components.json`: Shadcn configuration file.
        -   `.bolt/`: Bolt configuration files.
            -   `prompt`: Prompt for the AI.
            -   `ignore`: Files to ignore.
            -   `config.json`: Configuration file.

    ## API Integration Points

    The following components require API integration to fetch and manage data:

    1.  **`src/components/Requests.tsx`**:
        -   **Fetching Requests**:
            -   Currently uses dummy data (`dummySlotRequests`, `dummyExtensionRequests`, `dummyCancellationRequests`, `dummyCompanionCancellations`).
            -   Needs API calls to fetch slot requests, extension requests, user cancellation requests, and companion cancellation requests.
            -   API endpoints should support filtering, pagination, and sorting.
        -   **Updating Requests**:
            -   Currently uses local state to update the status of requests.
            -   Needs API calls to update the status of a request (e.g., approve, reject).
    2.  **`src/components/CreateCompanion.tsx`**:
        -   **Creating Companions**:
            -   Currently logs the form data to the console.
            -   Needs an API call to create a new companion profile.
            -   API endpoint should handle form data validation and return appropriate responses.
    3.  **`src/components/UpdateCompanion.tsx`**:
        -   **Fetching Update Requests**:
            -   Currently uses dummy data (`dummyUpdateRequests`).
            -   Needs an API call to fetch update requests for companion profiles.
            -   API endpoints should support filtering, pagination, and sorting.
        -   **Updating Companion Profiles**:
            -   Currently uses local state to update the status of requests.
            -   Needs API calls to update the companion profile with the new data.
            -   API endpoints should handle form data validation and return appropriate responses.
        -   **Deleting Companion Profiles**:
            -   Currently uses local state to delete a companion profile.
            -   Needs an API call to delete a companion profile.
    4.  **`src/components/TrackBookings.tsx`**:
        -   **Fetching Bookings**:
            -   Currently uses dummy data (`dummyBookings`).
            -   Needs an API call to fetch booking information.
            -   API endpoints should support filtering, pagination, and sorting.
    5.  **`src/components/Tickets.tsx`**:
        -   **Fetching Tickets**:
            -   Currently uses dummy data (`dummyTickets`).
            -   Needs an API call to fetch support tickets.
            -   API endpoints should support filtering, pagination, and sorting.
        -   **Updating Tickets**:
            -   Currently uses local state to update the status of tickets.
            -   Needs API calls to update the status of a ticket (e.g., resolve, deny).
        -   **Sending Replies**:
            -   Currently uses local state to add replies to tickets.
            -   Needs an API call to send a reply to a ticket.
    6.  **`src/components/Analytics.tsx`**:
        -   **Fetching Analytics Data**:
            -   Currently uses dummy data (`dummyGeneralAnalytics`, `dummyDelhiAnalytics`, `dummyLucknowAnalytics`, `dummySocietiesData`).
            -   Needs API calls to fetch various analytics data, including:
                -   Revenue metrics
                -   Booking metrics
                -   Geographic insights
                -   Payment insights
                -   Companion metrics
                -   Customer insights
                -   Marketing ROI
                -   Security and compliance data
                -   Advanced analytics data
                -   Environmental and social metrics
                -   Customer satisfaction data
            -   API endpoints should support filtering by date range, location, and other relevant parameters.
        -   **Fetching State Data**:
            -   Currently uses dummy data (`dummyStateData`).
            -   Needs an API call to fetch state-level data for the map.

    ## General API Requirements

    -   **Authentication**: The API should support authentication to ensure only authorized users can access the data.
    -   **Data Format**: The API should return data in JSON format.
    -   **Error Handling**: The API should return appropriate error messages for invalid requests.
    -   **Pagination**: The API should support pagination for large datasets.
    -   **Filtering and Sorting**: The API should support filtering and sorting of data based on various parameters.

    ## Notes

    -   This documentation provides a high-level overview of the API integration points.
    -   Specific API endpoints and request/response formats will need to be defined based on the backend implementation.
    -   Error handling and loading states should be implemented in the React components.
