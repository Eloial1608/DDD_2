export class SlugFactory {
  static create (value: string): string {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    return slug || 'slug'
  }
}
