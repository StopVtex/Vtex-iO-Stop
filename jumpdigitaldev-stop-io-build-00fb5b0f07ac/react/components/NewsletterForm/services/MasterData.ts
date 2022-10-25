export default class MasterData {
  acronym: string
  constructor(acronym: string) {
    this.acronym = acronym
  }
  private postLocalStorage(email: any) {
    let newsletterLocalData = localStorage.getItem('newsletterData')
    localStorage.setItem('newsletterData', `${newsletterLocalData ? `${newsletterLocalData},` : ''}${email}`)
  }
  private getLocalStorage(value: any) {
    let newsletterLocalData = localStorage.getItem('newsletterData')
    return newsletterLocalData && newsletterLocalData.indexOf(value) !== -1
  }
  async post(body: any) {
    try {
      await fetch(`/api/dataentities/${this.acronym}/documents`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
      this.postLocalStorage(body.email)
      return true
    } catch (error) {
      console.log('error', error)
      return false
    }
  }
  async get(fieldName: string, fieldValue: string) {
    const resGetLocalStorage = this.getLocalStorage(fieldValue)
    if (resGetLocalStorage) {
      return true
    }
    let resSearchEmailInMD: any = await fetch(`/api/dataentities/${this.acronym}/search?_fields=${fieldName}&_where=${fieldName}=${fieldValue}`)
    resSearchEmailInMD = await resSearchEmailInMD.json()
    if (resSearchEmailInMD && resSearchEmailInMD.length) {
      return true
    }
    return false
  }
}