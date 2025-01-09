# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/check-dist.yml/badge.svg)](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/MaUhlik-cen56998/s3-upload-artifact/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## Usage

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Upload artifact
    id: upload-artifact
    uses:
      MaUhlik-cen56998/s3-upload-artifact@v1.0.1 <!--- x-release-please-version
      -->
    with:
      path:
        path: |
          README.md
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-bucket: ${{ vars.AWS_BUCKET }}
        aws-region: ${{ vars.AWS_REGION }}
```
