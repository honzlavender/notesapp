import Foundation
import React

@objc(NoteManager)
class NoteManager: NSObject {
  
  private var notes: [String: [String: Any]] = [:]  // Store notes with unique IDs

  @objc
  func getHardcodedNote(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    let title = "Hardcoded Note Title"
    let body = "This is a hardcoded note body."
    let timestamp = Date()
    
    let note: [String: Any] = [
      "title": title,
      "body": body,
      "timestamp": timestamp
    ]
    
    resolver(note)
  }
  
  @objc
  func saveNote(_ title: String, body: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    let noteId = UUID().uuidString

    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
    let timestamp = dateFormatter.string(from: Date())

    let note: [String: Any] = ["id": noteId, "title": title, "body": body, "timestamp": timestamp]
    
    var notes = UserDefaults.standard.array(forKey: "notes") as? [[String: Any]] ?? []
    notes.append(note)
    UserDefaults.standard.set(notes, forKey: "notes")
    
    resolver(note)
  }
  
  @objc
  func updateNote(_ noteId: String, title: String, body: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    var notes = UserDefaults.standard.array(forKey: "notes") as? [[String: Any]] ?? []
    
    if let index = notes.firstIndex(where: { $0["id"] as? String == noteId }) {
      notes[index]["title"] = title
      notes[index]["body"] = body
      
      let dateFormatter = DateFormatter()
      dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
      let timestamp = dateFormatter.string(from: Date())
      notes[index]["timestamp"] = timestamp
      
      UserDefaults.standard.set(notes, forKey: "notes")
      
      resolver(notes[index])
    } else {
      rejecter("NoteNotFound", "Note with the given ID not found", nil)
    }
  }

  @objc
  func loadNotes(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    let notes = UserDefaults.standard.array(forKey: "notes") as? [[String: Any]] ?? []
    resolver(notes)
  }
  
  @objc
  func resetUserDefaults(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      UserDefaults.standard.removePersistentDomain(forName: Bundle.main.bundleIdentifier!)
      UserDefaults.standard.synchronize()
      resolver("UserDefaults reset")
  }

}

@objc(NoteManager)
extension NoteManager: RCTBridgeModule {
  static func moduleName() -> String! {
    return "NoteManager"
  }
}
