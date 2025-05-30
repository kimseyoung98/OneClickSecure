"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Edit, Trash2, Plus, Search, FileText, CheckCircle, XCircle } from "lucide-react"

export function Playbooks() {
  const [searchTerm, setSearchTerm] = useState("")

  const playbooks = [
    {
      id: 1,
      name: "웹서버 배포",
      description: "Nginx 웹서버 설치 및 설정",
      lastRun: "2시간 전",
      status: "성공",
      tasks: 8,
      category: "배포",
    },
    {
      id: 2,
      name: "데이터베이스 백업",
      description: "MySQL 데이터베이스 자동 백업",
      lastRun: "1일 전",
      status: "성공",
      tasks: 5,
      category: "백업",
    },
    {
      id: 3,
      name: "시스템 업데이트",
      description: "OS 패키지 업데이트 및 재부팅",
      lastRun: "3일 전",
      status: "실패",
      tasks: 12,
      category: "유지보수",
    },
    {
      id: 4,
      name: "로그 정리",
      description: "시스템 로그 파일 정리 및 압축",
      lastRun: "1주일 전",
      status: "성공",
      tasks: 3,
      category: "정리",
    },
    {
      id: 5,
      name: "보안 설정",
      description: "방화벽 및 SSH 보안 설정",
      lastRun: "2주일 전",
      status: "성공",
      tasks: 15,
      category: "보안",
    },
  ]

  const filteredPlaybooks = playbooks.filter(
    (playbook) =>
      playbook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">플레이북</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />새 플레이북
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="플레이북 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 플레이북 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaybooks.map((playbook) => (
          <Card key={playbook.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{playbook.name}</CardTitle>
                </div>
                <Badge variant="outline">{playbook.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{playbook.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">작업 수:</span>
                <span className="font-medium">{playbook.tasks}개</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">마지막 실행:</span>
                <span className="font-medium">{playbook.lastRun}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">상태:</span>
                <div className="flex items-center space-x-1">
                  {playbook.status === "성공" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <Badge variant={playbook.status === "성공" ? "default" : "destructive"}>{playbook.status}</Badge>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Play className="w-3 h-3 mr-1" />
                  실행
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
