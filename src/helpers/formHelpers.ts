export function convertFormDataToObj(formData: FormData): unknown {
  const root: any = {}
  for (const [path, value] of formData) {
    root[path] = value
  }
  return root
}
