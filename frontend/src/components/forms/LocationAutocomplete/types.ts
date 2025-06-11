export interface Suggestion {
    id: string;
    path: string;
    title: string;
    subtitle: string;
}

export interface LocationAutocompleteProps {
    onLocationSelect: (path: string) => void;
}
