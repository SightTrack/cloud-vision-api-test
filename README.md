# Cloud Vision API Species Identification

This project combines Google Cloud Vision API with Grok AI to identify possible species from images.

## Overview

The application analyzes images using Google Cloud Vision API's label detection capabilities, then processes those results through Grok's language model to generate species predictions. The system is designed to provide five potential species identifications based solely on the vision analysis data.

## How it Works

1. **Image Analysis**: Uses Google Cloud Vision API to detect and label objects, features, and characteristics in the provided image
2. **Data Processing**: Converts the complete vision API response into a structured format
3. **Species Prediction**: Sends the vision data to Grok AI with instructions to identify five possible species
4. **Results**: Returns species names in common name (scientific name) format

## Output Format

The system outputs exactly five species predictions in the format:
```
species1 (scientific name), species2 (scientific name), species3 (scientific name), species4 (scientific name), species5 (scientific name)
```

This tool is particularly useful for wildlife identification and biological research applications where automated species recognition from images is required. 