"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Plus, Search, Edit, Trash2, Circle, Users } from "lucide-react"

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")

  const hosts = [
    {
      id: 1,
      name: "web-01",
      ip: "192.168.1.10",
      status: "온라인",
      os: "Ubuntu 20.04",
      group: "웹서버",
      lastSeen: "방금 전",
    },
    {
      id: 2,
      name: "web-02",
      ip: "192.168.1.11",
      status: "온라인",
      os: "Ubuntu 20.04",
      group: "웹서버",
      lastSeen: "1분 전",
    },
    {
      id: 3,
      name: "db-01",
      ip: "192.168.1.20",
      status: "온라인",
      os: "CentOS 8",
      group: "데이터베이스",
      lastSeen: "2분 전",
    },
    {
      id: 4,
      name: "app-01",
      ip: "192.168.1.30",
      status: "오프라인",
      os: "Ubuntu 18.04",
      group: "애플리케이션",
      lastSeen: "1시간 전",
    },
    {
      id: 5,
      name: "app-02",
      ip: "192.168.1.31",
      status: "온라인",
      os: "Ubuntu 20.04",
      group: "애플리케이션",
      lastSeen: "방금 전",
    },
  ]

  const groups = [
    { name: "웹서버", count: 2, description: "Nginx 웹서버 그룹" },
    { name: "데이터베이스", count: 1, description: "MySQL 데이터베이스 서버" },
    { name: "애플리케이션", count: 2, description: "애플리케이션 서버 그룹" },
    { name: "로드밸런서", count: 1, description: "HAProxy 로드밸런서" },
  ]

  const filteredHosts = hosts.filter(
    (host) =>
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.ip.includes(searchTerm) ||
      host.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">인벤토리</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          호스트 추가
        </Button>
      </div>

      <Tabs defaultValue="hosts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hosts">호스트</TabsTrigger>
          <TabsTrigger value="groups">그룹</TabsTrigger>
        </TabsList>

        <TabsContent value="hosts" className="space-y-6">
          {/* 검색 */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="호스트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 호스트 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHosts.map((host) => (
              <Card key={host.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{host.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Circle
                        className={`h-3 w-3 ${
                          host.status === "온라인" ? "text-green-600 fill-green-600" : "text-red-600 fill-red-600"
                        }`}
                      />
                      <Badge variant={host.status === "온라인" ? "default" : "destructive"}>{host.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP 주소:</span>
                      <span className="font-mono">{host.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS:</span>
                      <span>{host.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">그룹:</span>
                      <Badge variant="outline">{host.group}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">마지막 확인:</span>
                      <span>{host.lastSeen}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      편집
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{group.count}개 호스트</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      편집
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
